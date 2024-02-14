package com.vt.spring.controller;

import com.vt.spring.entity.Album;
import com.vt.spring.repository.AlbumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")

public class AlbumController {
    @Autowired
    private AlbumRepository AlbumRepository;

    @GetMapping("/albums/get")
    public List<Album> getAllAlbums() {
        return AlbumRepository.findAll();
    }

    @GetMapping("/albums/get/{id}")
    public ResponseEntity<?> getAlbum(@PathVariable Integer id) {
        Optional<Album> albumOptional = AlbumRepository.findById(id);
        if (albumOptional.isPresent()) {
            return ResponseEntity.ok(albumOptional.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @SuppressWarnings("null")
    @PostMapping("/albums/add")
    public ResponseEntity<?> addAlbum(@RequestBody Album add) {
        Album AlbumGuardado = AlbumRepository.save(add);
        Map<String, Object> response = new HashMap<>();
        response.put("mensaje", "Nuevo album ha sido añadido");
        response.put("album", AlbumGuardado);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/albums/edit/{id}")
    public ResponseEntity<?> editAlbum(@PathVariable Integer id, @RequestBody Album album) {
        @SuppressWarnings("null")

        Optional<Album> AlbumExistente = AlbumRepository.findById(id);
        if (AlbumExistente.isPresent()) {
            Album AlbumActual = AlbumExistente.get();
            AlbumActual.setTitle(album.getTitle());
            AlbumActual.setYear(album.getYear());
            AlbumActual.setLenght(album.getLenght());
            AlbumRepository.save(AlbumActual);
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Album ha sido editado");
            response.put("Album", AlbumActual);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @SuppressWarnings("null")
    @DeleteMapping("/albums/delete/{id}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Integer id) {
        return AlbumRepository.findById(id).map(album -> {
            AlbumRepository.delete(album);
            return ResponseEntity.ok("Album ha sido eliminado");
        }).orElseGet(() -> new ResponseEntity<>("Album no encontrado con el id:" + id, HttpStatus.NOT_FOUND));
    }
};
