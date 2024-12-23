import { useSelector } from 'react-redux';
import { RootState } from './store';
import Header from './components/layout/Header';
import CreactModal from './components/modal/create/CreateScheduleModal';
import SideBar from './components/layout/SideBar';
import WeekCalendar from './components/calendar/WeekCalendar';
import InfoModal from './components/modal/info/InfoScheduleModal';
import MonthCalendar from './components/calendar/MonthCalendar';
import RightSection from './components/layout/header/RightSection';

function App() {
  const viewMode = useSelector((state: RootState) => state.viewMode.mode);

  return (
    <div className="min-h-screen w-full">
      <Header />

      <div className="my-2 flex flex-col px-4 md:flex-row">
        <SideBar />

        <div className="py-2 md:hidden">
          <RightSection />
        </div>

        {viewMode === '주' ? <WeekCalendar /> : <MonthCalendar />}
      </div>

      <InfoModal />
      <CreactModal />
    </div>
  );
}

export default App;
