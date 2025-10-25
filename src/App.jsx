import ProfileCard from './components/ProfileCard.jsx';
import GalleryCard from './components/GalleryCard.jsx';

function App() {
  return (
    <div className="min-h-screen p-8 md:p-12">
      {/* Instructions said to keep the left half empty on desktop.
        The "grid-cols-1 md:grid-cols-2" handles this.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
        
        {/* Empty left column on medium screens and up */}
        <div className="hidden md:block">
          {/* This column is intentionally left empty per instruction #4 */}
        </div>

        {/* Right column with content */}
        <div className="flex flex-col gap-6">
          <ProfileCard />
          <GalleryCard />
        </div>
        
      </div>
    </div>
  );
}

export default App;