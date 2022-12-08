
import "isomorphic-fetch" ;

describe('API request testing', () => {
    it('tests / request status 200', async() => {
        const CategoriesSet = 7315;
        const lat = 13.652383;
        const lng = 100.493872;
        const API_KEY = "iH9pB0bmpwepXVcXaGC6uNRKvhl8emRg";
    
        const API_REQUEST_URL = `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lng}
        &limit=50&radius=10000&categorySet=${CategoriesSet}&view=Unified&key=${API_KEY}`;
        
        fetch(API_REQUEST_URL)
        .then(r => {
            expect(r.status).toBeEqual(200);
          })
    
    });

    it('tests / response JSON data ', async() => {
        const CategoriesSet = 7315;
        const lat = 13.652383;
        const lng = 100.493872;
        const API_KEY = "iH9pB0bmpwepXVcXaGC6uNRKvhl8emRg";
    
        const API_REQUEST_URL = `https://api.tomtom.com/search/2/nearbySearch/.json?lat=${lat}&lon=${lng}
        &limit=50&radius=10000&categorySet=${CategoriesSet}&view=Unified&key=${API_KEY}`;
        
        fetch(API_REQUEST_URL)
        .then(r => {
            expect(r.data.results).toBeDefined();
            expect(r.data.results.length).toBeGreaterThan(0);
          })
    
    });

    // Insert other tests below this line

    // Insert other tests above this line
});