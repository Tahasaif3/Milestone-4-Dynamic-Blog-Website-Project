import Document, { Html, Head, Main, NextScript } from "next/document"
import AdSense from "@/components/AdSense"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="google-adsense-account" content="ca-pub-4686305629312312" />
          <AdSense pId="4686305629312312" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

