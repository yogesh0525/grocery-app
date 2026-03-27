package mongodb.mongodb;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/grocery")
public class GroceryController {

    private final GroceryRepository repo;

    public GroceryController(GroceryRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<GroceryItem> getAll() {
        return repo.findAll();
    }

    @PostMapping
    public GroceryItem add(@RequestBody GroceryItem item) {
        return repo.save(item);
    }

    @PutMapping("/{id}")
    public GroceryItem update(@PathVariable String id,
                              @RequestBody GroceryItem item) {
        item.setId(id);
        return repo.save(item);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repo.deleteById(id);
    }
}