
import ProfileInfo from "../components/ProfileInfo"
import ProjectsComponent from '@/components/ProjectsComponent'
import { createClient } from 'contentful'
import Socials from '@/components/Socials'
import Name from '@/components/Name'

export default async function Home() {

  async function fetchContentfulData() {
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_KEY,
    });
  
    // Fetch data from Contentful using the client
    const projects = await client.getEntries({
      content_type: "project",
      order: '-fields.dateCompleted',
    });
    const profile = await client.getEntries({  content_type: "profile"})
    // Return the fetched data
    return {
      profile,
      projects
    }
  }
  // Fetch data from Contentful
  const {projects, profile} = await fetchContentfulData();


  return (
    <div>
    <div className="absolute  w-full h-full bg-contain bg-no-repeat  opacity-[.29] box-shadow  bg-[url('/images/faded-city-circuit-low-res.jpeg')]"/>
    <div>
      <div className="hidden sm:block absolute sm:top-[24px]">
      <Socials/>
      </div>
      
    </div>
  
  <div className=" text-[#f5f5f5] p-8 sm:p-16 sm:pt-[72px]  lg:p-24 xl:px-32"  >

   <div className="flex flex-col justify-center">
<ProfileInfo data={profile}/>
<ProjectsComponent data={projects} />
              </div>
              </div>
              <div className="pb-10 flex flex-col justify-center w-[100vw]">
               <Name data={profile}/>
              <Socials/>
              </div>
              </div>
              
  )
}