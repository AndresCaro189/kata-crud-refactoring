package co.com.sofka.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
public class TodoService extends ValidateSave {

    @Autowired
    private TodoRepository repository;

    public Iterable<Todo> list(){ return repository.findAll(); }

    public Todo save(Todo todo){
        try {
            validateChar(todo);
            validateLength(todo);
        }catch (RuntimeException exception){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,exception.getMessage());
        }
        return repository.save(todo);
    }



    public void delete(Long id){
        repository.delete(get(id));
    }

    public Todo get(Long id){
         return repository.findById(id).orElseThrow();
    }

}
