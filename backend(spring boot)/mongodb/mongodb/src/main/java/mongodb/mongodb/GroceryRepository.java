package mongodb.mongodb;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface GroceryRepository extends MongoRepository<GroceryItem, String> {
}