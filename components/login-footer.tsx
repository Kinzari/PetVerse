const footerLinks = [
    // ['About', 'https://about.twitter.com'],
    // ['Help Center', 'https://help.twitter.com'],
    // ['Privacy Policy', 'https://twitter.com/tos'],
    // ['Cookie Policy', 'https://support.twitter.com/articles/20170514'],
    // ['Accessibility', 'https://help.twitter.com/resources/accessibility'],
    // [
    //   'Ads Info',
    //   'https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html'
    // ],
    // ['Blog', 'https://blog.twitter.com'],
    // ['Status', 'https://status.twitterstat.us'],
    // ['Careers', 'https://careers.twitter.com'],
    // ['Brand Resources', 'https://about.twitter.com/press/brand-assets'],
    // ['Advertising', 'https://ads.twitter.com/?ref=gl-tw-tw-twitter-advertise'],
    // ['Marketing', 'https://marketing.twitter.com'],
    // ['Twitter for Business', 'https://business.twitter.com'],
    // ['Developers', 'https://developer.twitter.com'],
    // ['Directory', 'https://twitter.com/i/directory/profiles'],
    // ['Settings', 'https://twitter.com/settings']
    ['About', '/login'],
    ['Help Center', 'https://www.google.com'],
    ['Privacy Policy', 'https://www.google.com'],
    ['Cookie Policy', 'https://www.google.com'],
    ['Accessibility', 'https://www.google.com'],
    [
      'Ads Info',
      'https://www.google.com'
    ],
    ['Blog', 'https://www.google.com'],
    ['Status', 'https://www.google.com'],
    ['Careers', 'https://www.google.com'],
    ['Brand Resources', 'https://www.google.com'],
    ['Advertising', 'https://www.google.com'],
    ['Marketing', 'https://www.google.com'],
    ['PetVerse for Business', 'https://www.google.com'],
    ['Developers', 'https://www.google.com'],
    ['Directory', 'https://www.google.com'],
    ['Settings', 'https://www.google.com']
  ] as const;
  
  export function LoginFooter(): JSX.Element {
    return (
      <footer className='hidden justify-center p-4 text-sm lg:flex' style={{ color: '#7C8085' }}>
        <nav className='flex flex-wrap justify-center gap-4 gap-y-2'>
          {footerLinks.map(([linkName, href]) => (
            <a
              className='custom-underline'
              target='_blank'
              rel='noreferrer'
              href={href}
              key={linkName}
              style={{ color: '#7C8085' }} // Set the color of each link
            >
              {linkName}
            </a>
          ))}
          <p style={{ color: '#7C8085' }}>© 2024 PetVerse, Inc.</p> {/* Set the color of the copyright text */}
        </nav>
      </footer>
    );
  }
  