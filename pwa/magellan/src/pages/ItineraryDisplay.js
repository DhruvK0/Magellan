import { useItinerary } from "../utils/ItineraryContext";
const ItineraryDisplay = () => {
    const { itinerary } = useItinerary();
  
    // Handle case where itinerary is null (user navigates to /itinerary directly, etc.)
    if (!itinerary) {
      return <p>No itinerary available. Please create one first.</p>;
    }
  
    return (
      <div>
        <h1>Your Itinerary</h1>
        <div>{itinerary}</div>
      </div>
    );
  };