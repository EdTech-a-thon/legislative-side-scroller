<script lang="ts">
  import SitePage from './SitePage.svelte';
</script>

<SitePage title="Privacy" lede="What we collect, what we don't, and why.">
  <section class="site-card">
    <p>
      Capitol Hill Crawler does not collect personal information from visitors or students. We use
      Cloudflare Web Analytics to anonymously count the number of visits, which helps us understand
      how Capitol Hill Crawler is being used in classrooms. Cloudflare Web Analytics is cookieless,
      does not fingerprint visitors, and does not track users across other sites. See Cloudflare's
      <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">privacy policy</a>
      for details. We do not share, sell, or otherwise transfer any visitor data to third parties.
      Capitol Hill Crawler stores your character, campaign progress, and completion record in your
      browser's local storage, and that information never leaves your device.
    </p>
  </section>
  <section class="site-card">
    <h2>Location</h2>
    <p>
      Several questions on the USCIS civics test depend on where you live: your U.S. Senators, your
      Governor, your state capital, and your U.S. Representative. To ask those questions, Capitol
      Hill Crawler needs to know your state or territory, which you choose from a list when you
      start a campaign.
    </p>
    <p>
      U.S. Representatives serve congressional districts rather than whole states, so a state alone
      cannot identify one person. You can optionally enter a ZIP code to narrow that question to
      your own district. This is never required: without a ZIP code, any current U.S. Representative
      from your state is accepted as correct.
    </p>
    <p>
      Your state or territory and your ZIP code, if you enter one, are saved in your browser's local
      storage along with the rest of your campaign. Neither is transmitted anywhere. The ZIP code is
      matched against a list of congressional districts that ships inside the game itself, so the
      lookup runs entirely in your browser with no request to us or to any third-party service. We
      never ask for your street address, and the game does not use your device's location.
    </p>
    <p>
      Your ZIP code is not shown in your Notebook, on your completion certificate, or in any teacher
      record. To remove it, clear the ZIP field in your study profile, or clear this site's data in
      your browser to erase your saved campaign entirely.
    </p>
  </section>
  <section class="site-card">
    <p>
      Questions or concerns? Email
      <a href="mailto:support@capitolcrawler.com?subject=capitolhillcrawler%20privacy">support@capitolcrawler.com</a>.
    </p>
  </section>
</SitePage>
