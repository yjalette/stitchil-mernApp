export const validateListing = listing => {
    if (!listing.gallery || listing.gallery.length < 10) {
        return "gallery"
    }
    return true
}