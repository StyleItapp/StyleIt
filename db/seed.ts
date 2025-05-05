import { db } from "./index";
import { stockImages } from "@shared/schema";

async function seed() {
  try {
    // Check if we already have images in the database
    const existingImages = await db.select().from(stockImages);
    
    if (existingImages.length > 0) {
      console.log("Stock images already seeded, skipping...");
      return;
    }
    
    // Fashion outfit collages (4)
    const outfitCollages = [
      {
        url: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Fashion style collage",
        category: "outfit_collage"
      },
      {
        url: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Fashion outfit collage",
        category: "outfit_collage"
      },
      {
        url: "https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Seasonal fashion outfit collection",
        category: "outfit_collage"
      },
      {
        url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Street style fashion collage",
        category: "outfit_collage"
      }
    ];
    
    // Women styling clothes (3)
    const womenStyling = [
      {
        url: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Fashion styling",
        category: "women_styling"
      },
      {
        url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Fashion styling",
        category: "women_styling"
      },
      {
        url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Fashion styling",
        category: "women_styling"
      }
    ];
    
    // Wardrobe organization (2)
    const wardrobeOrganization = [
      {
        url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Wardrobe organization",
        category: "wardrobe_organization"
      },
      {
        url: "https://images.unsplash.com/photo-1599554636210-561c6b6ebb26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Organized closet",
        category: "wardrobe_organization"
      }
    ];
    
    // Combine all images
    const allImages = [...outfitCollages, ...womenStyling, ...wardrobeOrganization];
    
    // Insert into the database
    await db.insert(stockImages).values(allImages);
    
    console.log("Successfully seeded stock images!");
  } catch (error) {
    console.error("Error seeding stock images:", error);
  }
}

seed();
