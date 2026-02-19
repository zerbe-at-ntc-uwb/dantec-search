import AllElementsSearch from '../search/all-elements-search.tsx'
import SearchInterface from '../search/search-interface.tsx'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './tabs-content.scss'

export default function TabsContent() {
  return (
    <Tabs className="nav-tabs">
      <TabList>
        <Tab>Home</Tab>
        <Tab>All elements view</Tab>
        <Tab>Search</Tab>
      </TabList>
      <TabPanel>
        Nothing here yet.
      </TabPanel>
      <TabPanel forceRender={true} >
        <AllElementsSearch />
      </TabPanel>
      <TabPanel forceRender={true}>
        <SearchInterface />
      </TabPanel>
    </Tabs>
  );
}
