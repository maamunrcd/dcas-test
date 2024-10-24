import Banner from './components/Banner'
import Products from './components/products';
import useFetch from './hooks/useFetch';

function App() {
  const { data, error, loading } = useFetch(
    "https://bestinbd.com/projects/web/task/api/get-req-data/sections?type=slug&value=react-task&get_section=yes&image=yes&post=yes&file=yes&gallery=yes"
  );
  // Break down the data access step by step
  const sections = data?.data?.sections;

  // Slider Section
  const sliderSection = sections?.find(
    (section) => section.section_data.template === "slider_template"
  );

  const sliderData =
    sliderSection?.posts?.list
      ?.filter((item) => item.images?.some((img) => img.background === "on"))
      .map((item) => ({
        title: item.data.title,
        subtitle: item.data.subtitle,
        imageUrl: item.images.find((img) => img.background === "on")?.full_path,
      })) || [];

  // Products Section
  const productsSection = sections?.find(
    (section) => section.section_data.template === "products"
  );

  const productsData =
    productsSection?.posts?.list
      ?.map((item) => ({
        title: item.data.title,
        subtitle: item.data.subtitle,
        imageUrl: item.images.find((img) => img.thumb === "on")?.full_path,
      })) || [];

  return (
    <>
      <Banner sliderData={sliderData} loading={loading} error={error}></Banner>
      <Products productsData={productsData} loading={loading} error={error}></Products>
    </>
  )
}

export default App
