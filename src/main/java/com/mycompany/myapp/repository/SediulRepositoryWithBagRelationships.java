package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Sediul;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface SediulRepositoryWithBagRelationships {
    Optional<Sediul> fetchBagRelationships(Optional<Sediul> sediul);

    List<Sediul> fetchBagRelationships(List<Sediul> sediuls);

    Page<Sediul> fetchBagRelationships(Page<Sediul> sediuls);
}
