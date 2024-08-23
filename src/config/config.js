const config = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritePostCollectionId : String(import.meta.env.VITE_APPWRITE_POST_COLLECTION_ID),
    appwriteUserCollectionId : String(import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID),
    appwriteBuketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    rteKey: String(import.meta.env.VITE_RTE_API_KEY),
    appwriteProfileBuketId : String(import.meta.env.VITE_APPWRITE_PROFILEIMAGE_BUCKET_ID)
}

export default config;