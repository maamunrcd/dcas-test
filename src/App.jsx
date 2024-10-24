import Banner from './components/Banner';
import Products from './components/products';
import useFetch from './hooks/useFetch';

function App() {
  const { data, error, loading } = useFetch(
    "https://bestinbd.com/projects/web/task/api/get-req-data/sections?type=slug&value=react-task&get_section=yes&image=yes&post=yes&file=yes&gallery=yes"
  );
  const getSectionData = (sections, template, imageKey) => {
    const section = sections?.find(
      (section) => section.section_data.template === template
    );

    return section?.posts?.list
      ?.filter((item) => item.images.some((img) => img[imageKey] === "on"))
      ?.map((item) => ({
        title: item.data.title,
        subtitle: item.data.subtitle,
        imageUrl: item.images.find((img) => img[imageKey] === "on")?.full_path,
      })) || [];
  };

  const sections = data?.data?.sections;
  const sliderData = getSectionData(sections, "slider_template", "background");
  const productsData = getSectionData(sections, "products", "thumb");

  return (
    <>
      <Banner sliderData={sliderData} loading={loading} error={error} />
      <Products productsData={productsData} loading={loading} error={error} />
    </>
  );
}

export default App;
