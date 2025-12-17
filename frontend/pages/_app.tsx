import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';
import { DefaultSeo } from 'next-seo';
// import { useEventListener } from 'usehooks-ts';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { CustomCursor } from '../src/CustomCursor';
import { ThreePage } from '../src/ThreePage';
import { SiteData } from '../src/SiteData';
import { MobileVhAsCssVar } from '../src/MobileVhAsCssVar';
import { useConsoleLogDevSignature } from '../src/useConsoleLogDevSignature';
import { PlayAllVideosOnClickInLowPowerMode } from '../src/usePlayAllVideosOnClickInLowPowerMode';

function MyApp({ Component, pageProps }: AppProps) {
  const siteData:SiteData = {
    startingScene: pageProps.scene ?? 'error',
    projects: pageProps.projects ?? null,
  };

  useConsoleLogDevSignature();

  // useEventListener('focusin', (e) => {
  //   console.log('focused on', e.target);
  // });

  const title = 'Able Gurung, Software Engineer';
  const description = 'I help awesome designers (like you) build their wildest dreams.';
  const url = 'https://ablegurung.com.np';

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        canonical="https://ablegurung.com.np"
        openGraph={{
          url,
          title,
          description,
          type: 'website',
          images: [
            {
              url: 'https://ablegurung.com.np/images/social.png',
              width: 2333,
              height: 1313,
              alt: 'Ablegurung.com wordmark over colorful, crudely scribbled illustration of laptop displaying another crudely drawn illustration of a laptop.',
              type: 'image/png',
            },
          ],
          site_name: 'ablegurung.com.np',
        }}
        twitter={{
          handle: '@ablegurung',
          cardType: 'summary_large_image',
        }}
      />
      <GoogleAnalytics trackPageViews />
      <MobileVhAsCssVar />
      <ThreePage
        siteData={siteData}
      />
      <Component {...pageProps} />
      <CustomCursor />
      <PlayAllVideosOnClickInLowPowerMode />
    </>
  );
}

export default MyApp;
