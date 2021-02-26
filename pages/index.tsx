import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import HomeProductsList from '../components/home/HomeProductsList'
import DefaultLayout from '../components/layouts/DefaultLayout'

export default function Home(props) {
  return (
    <DefaultLayout>
      <HomeProductsList/>
    </DefaultLayout>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'footer']),
  }
})