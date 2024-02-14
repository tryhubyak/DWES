package com.vt.spring.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "Albums")

public class Album {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Album")
    private Integer idAlbum;

    @Column(name = "title")
    private String Title;

    @Column(name = "year")
    private String year;

    @Column(name = "lenght")
    private String lenght;

}