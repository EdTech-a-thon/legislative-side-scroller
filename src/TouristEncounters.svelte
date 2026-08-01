<script lang="ts">
  import Portrait from './Portrait.svelte';
  import { touristDialogue } from './story-dialogue';
  const tourists = [
    { id: 'hollinger', name: 'Mr. Pete Hollinger', place: 'Mall Cafe', voice: 'Retired history teacher who overshares monument trivia.', line: '“The trick to history is asking why people remembered something, not just when it happened.”', reward: 5 },
    { id: 'tanaka', name: 'Yuki Tanaka', place: 'Washington Monument', voice: 'Exchange student who asks the player questions back.', line: '“I have been reading about your government. Will you trade one fact you know for one I found?”', reward: 1 },
    { id: 'brennan', name: 'The Brennan Family', place: 'National Mall', voice: 'Field-trip parents keeping up with energetic children.', line: '“We promised the kids one more monument if someone can settle a civics question for us.”', reward: 1 },
    { id: 'vance', name: 'Dolores Vance', place: 'Library of Congress', voice: 'Genealogy researcher who connects every story to family history.', line: '“Every answer has a family story behind it, if you know where to look.”', reward: 1 },
    { id: 'ibarra', name: 'Ranger Ruth Ibarra', place: 'Lincoln Memorial', voice: 'Former Park Service ranger and reliable guide.', line: '“A good visitor leaves with more questions than they arrived with. Here is one to keep.”', reward: 5 },
    { id: 'merck', name: 'Big Country Merck', place: 'Mall Cafe', voice: 'Loud visitor in a novelty hat who is sharper than he first appears.', line: '“I came for the photo, but that monument sign taught me something worth taking home.”', reward: 1 },
    { id: 'boyle', name: 'Sister Agnes Boyle', place: 'Supreme Court', voice: 'Retired nun on a pilgrimage of every free attraction in D.C.', line: '“Free knowledge is still knowledge. Take this and pass it along.”', reward: 1 },
    { id: 'ottley', name: 'Deshawn Ottley', place: 'Press Row', voice: 'Street musician who treats questions like song trivia.', line: '“Every good answer has a rhythm. Try this one on for size.”', reward: 1 },
    { id: 'kowalski', name: 'The Kowalski Twins', place: 'National Mall', voice: 'Bickering siblings on a school trip.', line: '“We will share our study card if you promise not to take sides.”', reward: 1 },
    { id: 'ffolliott', name: 'Marguerite Ffolliott', place: 'Library of Congress', voice: 'Eccentric amateur historian who corrects tour guides.', line: '“The tour guide missed the important part. Fortunately, I wrote it down.”', reward: 5 },
    { id: 'vendor', name: 'Benno the Vendor', place: 'Mall Cafe', voice: 'Hot dog vendor who knows everyone.', line: '“I trade good gossip for good questions. This one is on the house.”', reward: 1 },
    { id: 'owusu', name: 'Cadet Owusu', place: 'Washington Monument', voice: 'ROTC student on a solemn visit.', line: '“Knowing the structure of our country is part of serving it well.”', reward: 1 },
    { id: 'draeger', name: 'Ilse Draeger', place: 'Lincoln Memorial', voice: 'German tourist practicing English through historical questions.', line: '“I found this fact while practicing. I hope I say it correctly.”', reward: 1 },
    { id: 'higgins', name: '“Roadmap” Higgins', place: 'Press Row', voice: 'Local who has memorized every D.C. bus route.', line: '“Every route has a transfer. This fact might be the transfer you need.”', reward: 5 },
    { id: 'duncan', name: 'Duncan Johnson', place: 'National Mall', voice: 'A special visitor who believes civic games can help students learn.', line: '“Keep going. A game can be serious learning when someone cares enough to build it.”', reward: 5 },
    { id: 'adam-doorbell', name: 'Adam Doorbell', place: 'Capitol Visitor Center', voice: 'Visitor comparing the building bells and clocks.', line: '“Every public building has a story if you take time to listen.”', reward: 1 },
    { id: 'markus-gibo', name: 'Markus Gibo', place: 'National Mall', voice: 'Visitor sketching the monument skyline.', line: '“The view makes history feel a little closer.”', reward: 1 },
    { id: 'frog-seibert', name: 'Frog Seibert', place: 'Reflecting Pool', voice: 'Visitor taking a careful walking tour.', line: '“A good question is worth stopping for.”', reward: 1 },
    { id: 'adam-gruff', name: 'Adam Gruff', place: 'Union Station', voice: 'Traveler waiting for a train home.', line: '“The best trips give you something useful to bring back.”', reward: 1 },
    { id: 'topher-thompson', name: 'Topher Thompson', place: 'Library of Congress', voice: 'Reader exploring the public exhibits.', line: '“Libraries make it easier to keep learning.”', reward: 1 },
    { id: 'james-e-tollbooth', name: 'James E Tollbooth', place: 'Capitol Visitor Center', voice: 'Visitor studying the building map.', line: '“Knowing where you are helps you understand where to go next.”', reward: 1 },
    { id: 'steven-smurfetti', name: 'Steven Smurfetti', place: 'National Mall', voice: 'Visitor collecting postcards.', line: '“A small souvenir can hold a big memory.”', reward: 1 },
    { id: 'willy-johnson', name: 'Willy Johnson', place: 'Washington Monument', voice: 'Visitor checking the monument guide.', line: '“There is always one more fact worth learning.”', reward: 1 },
    { id: 'brian-hoey', name: 'Brian Hoey', place: 'Press Row', voice: 'Visitor following the day’s headlines.', line: '“The details matter as much as the headline.”', reward: 1 },
    { id: 'surya-palli', name: 'Surya Palli', place: 'Library of Congress', voice: 'Visitor reading about civic institutions.', line: '“Questions are where good research begins.”', reward: 1 },
    { id: 'bob-overalls', name: 'Bob Overalls', place: 'Mall Cafe', voice: 'Visitor taking a well-earned break.', line: '“Learning works better with a little encouragement.”', reward: 1 },
    { id: 'jenna-browner', name: 'Jenna Browner', place: 'Supreme Court', voice: 'Visitor listening to a court tour.', line: '“Every branch has work to do.”', reward: 1 },
    { id: 'maryanne-hologram', name: 'Maryanne Hologram', place: 'National Mall', voice: 'Visitor taking photos near the memorials.', line: '“History looks different when you see it in person.”', reward: 1 },
    { id: 'benjamin-swifeali', name: 'Benjamin Swifeali', place: 'Union Station', voice: 'Visitor planning the next stop.', line: '“A good plan leaves room to discover something new.”', reward: 1 },
    { id: 'manda-bucees', name: 'Manda Bucees', place: 'Mall Cafe', voice: 'Visitor sharing snacks with the group.', line: '“A study break can help an idea stick.”', reward: 1 },
    { id: 'pat-keller', name: 'Pat Keller', place: 'Capitol Visitor Center', voice: 'Visitor asking thoughtful tour questions.', line: '“Understanding the process makes it less mysterious.”', reward: 1 },
    { id: 'lisa-deshazo', name: 'Lisa DeShazo', place: 'Library of Congress', voice: 'Visitor looking through historical displays.', line: '“The past leaves clues for people willing to look.”', reward: 1 },
    { id: 'capt-jack-adley', name: 'Capt. Jack Adley', place: 'Washington Monument', voice: 'Visitor keeping the group on schedule.', line: '“A little preparation goes a long way.”', reward: 1 },
    { id: 'arya-gray', name: 'Arya Gray', place: 'National Mall', voice: 'Visitor making a map of the memorials.', line: '“Every landmark tells part of the larger story.”', reward: 1 },
    { id: 'gia-charles', name: 'Gia Charles', place: 'Press Row', voice: 'Visitor comparing notes from the news.', line: '“It helps to ask who, what, and why.”', reward: 1 },
    { id: 'benny-wesley', name: 'Benny Wesley', place: 'Mall Cafe', voice: 'Visitor trading favorite civics facts.', line: '“The best fact is the one you can explain to someone else.”', reward: 1 },
    { id: 'melissa-emmers', name: 'Melissa Emmers', place: 'Supreme Court', voice: 'Visitor reading the court’s public guide.', line: '“Rules matter most when people understand them.”', reward: 1 },
    { id: 'patrick-bryan', name: 'Patrick Bryan', place: 'Union Station', voice: 'Visitor helping a group find its way.', line: '“A clear direction helps everyone move forward.”', reward: 1 },
    { id: 'sean-obyrne', name: "Sean O'Byrne", place: 'Library of Congress', voice: 'Visitor browsing the reading room exhibits.', line: '“One good source can lead to another.”', reward: 1 },
    { id: 'spencer-williams', name: 'Spencer Williams', place: 'Capitol Visitor Center', voice: 'Visitor watching the orientation film.', line: '“Big ideas make more sense when you see how they connect.”', reward: 1 },
    { id: 'paige-blakely', name: 'Paige Blakely', place: 'National Mall', voice: 'Visitor keeping a travel journal.', line: '“Writing down what you learn makes it easier to remember.”', reward: 1 },
    { id: 'eugene-langowski', name: 'Eugene Langowski', place: 'Washington Monument', voice: 'Visitor checking a history guidebook.', line: '“There is a reason people keep coming back to these places.”', reward: 1 },
    { id: 'michele-rosini', name: 'Michele Rosini', place: 'Mall Cafe', voice: 'Visitor meeting friends after a tour.', line: '“A good conversation can be part of learning, too.”', reward: 1 },
    { id: 'enzo-vincenzo', name: 'Enzo Vincenzo', place: 'Union Station', voice: 'Visitor admiring the station architecture.', line: '“Public spaces are built for people to share.”', reward: 1 },
    { id: 'gabrielle-lucca', name: 'Gabrielle Lucca', place: 'Library of Congress', voice: 'Visitor searching for a favorite historical story.', line: '“The right question can open a whole chapter.”', reward: 1 },
    { id: 'marc-scalatino', name: 'Marc Scalatino', place: 'Press Row', voice: 'Visitor taking notes on a public briefing.', line: '“Listening closely is its own kind of preparation.”', reward: 1 },
    { id: 'meghan-alexander', name: 'Meghan Alexander', place: 'Supreme Court', voice: 'Visitor reflecting on a courthouse tour.', line: '“Civics becomes real when you see it in action.”', reward: 1 },
    { id: 'gilbert-turtle', name: 'Gilbert Turtle', place: 'National Mall', voice: 'Visitor enjoying a slow walk between monuments.', line: '“There is no rush when you are learning something worthwhile.”', reward: 1 }
  ];

  let { claimed, onclaim, onclose }: { claimed: string[]; onclaim: (id: string, count: number, source: string) => void; onclose: () => void } = $props();
</script>

<div class="modal-backdrop"><dialog class="tourist-panel" open aria-labelledby="tourist-title">
   <button class="close" aria-label="Close tourist encounters" onclick={onclose}>×</button><p class="eyebrow">WASHINGTON, D.C. · OPTIONAL STUDY ENCOUNTERS</p><h2 id="tourist-title">TOURISTS & LOCALS</h2>
   <p>Each person has a one-time study reward. Five-pack rewards are marked with a gold card.</p>
   <section aria-label="Visitor reflections"><p>{touristDialogue[0].speaker}: {touristDialogue[0].text}</p></section>
  <div class="tourist-list">{#each tourists as tourist}<article class:claimed={claimed.includes(tourist.id)}><Portrait character="npc" initials={tourist.name.split(' ').map((word) => word[0]).join('').slice(0, 2)} mood="pleased"/><div><h3>{tourist.name}</h3><span>{tourist.place} · {tourist.voice}</span><p>{tourist.line}</p></div><button disabled={claimed.includes(tourist.id)} onclick={() => onclaim(tourist.id, tourist.reward, tourist.name)}>{claimed.includes(tourist.id) ? 'COLLECTED' : tourist.reward === 5 ? 'CLAIM 5-PACK' : 'CLAIM STUDY CARD'}</button></article>{/each}</div>
</dialog></div>
