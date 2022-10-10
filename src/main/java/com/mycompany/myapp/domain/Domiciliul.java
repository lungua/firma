package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Domiciliul.
 */
@Entity
@Table(name = "domiciliul")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Domiciliul implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "adresa_ci")
    private String adresaCI;

    @ManyToOne
    @JsonIgnoreProperties(value = { "buletins", "datesocietates", "domiciliuls", "dateasociatis", "srl" }, allowSetters = true)
    private AsocAdmin asocadmin3;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Domiciliul id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdresaCI() {
        return this.adresaCI;
    }

    public Domiciliul adresaCI(String adresaCI) {
        this.setAdresaCI(adresaCI);
        return this;
    }

    public void setAdresaCI(String adresaCI) {
        this.adresaCI = adresaCI;
    }

    public AsocAdmin getAsocadmin3() {
        return this.asocadmin3;
    }

    public void setAsocadmin3(AsocAdmin asocAdmin) {
        this.asocadmin3 = asocAdmin;
    }

    public Domiciliul asocadmin3(AsocAdmin asocAdmin) {
        this.setAsocadmin3(asocAdmin);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Domiciliul)) {
            return false;
        }
        return id != null && id.equals(((Domiciliul) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Domiciliul{" +
            "id=" + getId() +
            ", adresaCI='" + getAdresaCI() + "'" +
            "}";
    }
}
