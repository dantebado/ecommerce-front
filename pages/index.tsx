import HomeProductsList from '../components/home/HomeProductsList'
import DefaultLayout from '../components/layouts/DefaultLayout'

export default function Home(props) {
  return (
    <DefaultLayout>
      <HomeProductsList/>
    </DefaultLayout>
  )
}