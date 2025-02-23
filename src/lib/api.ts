export async function getEducationImage() {
    try {
      const response = await fetch("https://source.unsplash.com/500x500/?education,teacher,student");
      return response.url;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null; // Fallback in case of an error
    }
  }

  