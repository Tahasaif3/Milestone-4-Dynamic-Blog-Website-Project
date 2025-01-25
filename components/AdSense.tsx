import Script from "next/script"

type AdSenseTypes = {
  pId: string
}

const AdSense = ({ pId }: AdSenseTypes) => {
  return (
    <>
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "ca-pub-${pId}",
              enable_page_level_ads: true
            });
          `,
        }}
      />
    </>
  )
}

export default AdSense

