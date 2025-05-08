import { getCurrentUser } from "@/service/AuthService";
import { getAllReviews } from "@/service/Review";


// Core helper to fetch reviews for a specific event
const getReviews = async (eventId: string): Promise<Review[]> => {
  const getData = await getAllReviews(eventId);
  return getData.data;
};

// Check if a user has already reviewed an event
export async function hasUserReviewedEvent(userId: string, eventId: string):boolean {
  const reviews = await getReviews(eventId);
  return reviews.some((review) => review.userId === userId && review.eventId === eventId);
}



export async function getReviewsForEvent(eventId: string){
  const reviews = await getReviews(eventId);
  const user = await getCurrentUser();
  return reviews
    .map((review) => {
 
      if (!user) throw new Error(`User with ID ${review.userId} not found.`);
      return { ...review, user };
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}


// Calculate average rating for an event
export async function getAverageRating(eventId: string): Promise<number> {
  const reviews = await getReviews(eventId);
  const eventReviews = reviews.filter((review) => review.eventId === eventId);
  if (eventReviews.length === 0) return 0;

  const sum = eventReviews.reduce((total, review) => total + review.rating, 0);
  return Number.parseFloat((sum / eventReviews.length).toFixed(1));
}
