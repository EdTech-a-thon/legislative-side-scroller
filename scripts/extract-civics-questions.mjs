import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const sourcePdf = '2025-Civics-Test-128-Questions-and-Answers.pdf';
const tempText = join(tmpdir(), 'capitol-hill-crawler-civics-source.txt');
const outputFile = 'src/civics-questions.ts';

execFileSync('gs', [
  '-q', '-dSAFER', '-dBATCH', '-dNOPAUSE', '-sDEVICE=txtwrite',
  `-sOutputFile=${tempText}`, sourcePdf
]);

const dynamicQuestionIds = new Set([23, 29, 30, 38, 39, 57, 61, 62]);
const text = readFileSync(tempText, 'utf8');
const lines = text.split(/\r?\n/);
const questions = [];

for (let index = 0; index < lines.length; index += 1) {
  const match = lines[index].match(/^\s*(\d{1,3})\.\s+(.*\S)\s*$/);
  if (!match) continue;

  const id = Number(match[1]);
  if (id < 1 || id > 128) continue;

  let prompt = match[2].trim();
  prompt = prompt.replace(/\s*\*\s*/g, ' ').replace(/\s+/g, ' ').trim();
  let cursor = index + 1;

  while (cursor < lines.length && !/^\s*•/.test(lines[cursor]) && !/^\s*\d{1,3}\./.test(lines[cursor])) {
    const continuation = lines[cursor].trim();
    if (continuation && !/^(AMERICAN|SYMBOLS|A:|B:|C:|\d+ of \d+)/.test(continuation)) prompt += ` ${continuation}`;
    cursor += 1;
  }

  const answers = [];
  while (cursor < lines.length && /^\s*•/.test(lines[cursor])) {
    let answer = lines[cursor].replace(/^\s*•\s*/, '').trim();
    cursor += 1;
    while (cursor < lines.length && !/^\s*•/.test(lines[cursor]) && !/^\s*\d{1,3}\./.test(lines[cursor])) {
      const continuation = lines[cursor].trim();
      if (continuation && !/^\d+ of \d+/.test(continuation)) answer += ` ${continuation}`;
      cursor += 1;
    }
    answers.push(answer);
  }

  questions.push({
    id,
    prompt,
    acceptedAnswers: answers,
    category: id <= 72 ? 'government' : id <= 118 ? 'history' : 'symbols',
    dynamic: dynamicQuestionIds.has(id),
    multiPart: /\b(name|what are|describe) (two|three|five|one of the four)\b/i.test(prompt)
  });
}

if (questions.length !== 128 || questions.some((question, index) => question.id !== index + 1)) {
  throw new Error(`Expected 128 sequential questions; extracted ${questions.length}.`);
}

mkdirSync('src', { recursive: true });
writeFileSync(outputFile, `// Generated from ${sourcePdf} by scripts/extract-civics-questions.mjs. Do not edit by hand.\n// The USCIS 65/20 accommodation is intentionally excluded from this 7th-grade civics game.\n\nexport type CivicsCategory = 'government' | 'history' | 'symbols';\n\nexport type CivicsQuestion = {\n  id: number;\n  prompt: string;\n  acceptedAnswers: string[];\n  category: CivicsCategory;\n  dynamic: boolean;\n  multiPart: boolean;\n};\n\nexport const civicsQuestions: CivicsQuestion[] = ${JSON.stringify(questions, null, 2)};\n\nexport const civicsQuestionById = new Map(civicsQuestions.map((question) => [question.id, question]));\n`, 'utf8');

console.log(`Generated ${outputFile} with ${questions.length} questions.`);
