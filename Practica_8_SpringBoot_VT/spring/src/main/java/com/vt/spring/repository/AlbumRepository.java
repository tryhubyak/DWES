package com.vt.spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vt.spring.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, Integer> {
}
