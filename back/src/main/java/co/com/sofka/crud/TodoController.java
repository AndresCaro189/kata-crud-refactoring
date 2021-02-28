package co.com.sofka.crud;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Provider;
import java.text.ParseException;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoService service;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping(value = "api/todos")
    @ResponseBody
    public List<TodoDTO> list(){
        List<Todo> todos = service.list();
        return todos.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @PostMapping(value = "api/todo")
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public TodoDTO save(@Valid @RequestBody TodoDTO todoDto) throws ParseException {
        Todo todo = convertToEntity(todoDto);
        Todo todoSaved = service.save(todo);
        return convertToDto(todoSaved);
    }

    @PutMapping(value = "api/todo")
    @ResponseStatus(HttpStatus.CREATED)
    public TodoDTO update(@RequestBody TodoDTO todoDTO) throws ParseException{
        Todo todo = convertToEntity(todoDTO);
        if(todoDTO.getId() != null){
            return convertToDto(service.save(todo));
        }
        throw new RuntimeException("No existe el id para actualziar");
    }

    @DeleteMapping(value = "api/{id}/todo")
    public void delete(@PathVariable("id")Long id){
        service.delete(id);
    }

    @GetMapping(value = "api/{id}/todo")
    @ResponseBody
    public TodoDTO get(@PathVariable("id") Long id){
        return convertToDto(service.get(id)) ;
    }

    //Convierte de todo a todoDto
    private TodoDTO convertToDto(Todo todo) {
        return modelMapper.map(todo, TodoDTO.class);
    }

    private Todo convertToEntity(TodoDTO todoDto) throws ParseException {
        return modelMapper.map(todoDto, Todo.class);
    }
}
