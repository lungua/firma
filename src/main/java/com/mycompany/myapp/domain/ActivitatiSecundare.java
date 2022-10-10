package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ActivitatiSecundare.
 */
@Entity
@Table(name = "activitati_secundare")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ActivitatiSecundare implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "cod_caen")
    private String codCAEN;

    @Column(name = "denumirea")
    private String denumirea;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "inregistratDe", "asocadmins", "capitalsocials", "alteactivitatis", "activitatiprincipales", "activitatisecundares", "sedius",
        },
        allowSetters = true
    )
    private Srl srl5;

    @ManyToMany(mappedBy = "actprinc2s")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "adresas", "dovadas", "proprietaris", "actprinc1s", "actprinc2s", "srl4" }, allowSetters = true)
    private Set<Sediul> sediulies = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ActivitatiSecundare id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodCAEN() {
        return this.codCAEN;
    }

    public ActivitatiSecundare codCAEN(String codCAEN) {
        this.setCodCAEN(codCAEN);
        return this;
    }

    public void setCodCAEN(String codCAEN) {
        this.codCAEN = codCAEN;
    }

    public String getDenumirea() {
        return this.denumirea;
    }

    public ActivitatiSecundare denumirea(String denumirea) {
        this.setDenumirea(denumirea);
        return this;
    }

    public void setDenumirea(String denumirea) {
        this.denumirea = denumirea;
    }

    public Srl getSrl5() {
        return this.srl5;
    }

    public void setSrl5(Srl srl) {
        this.srl5 = srl;
    }

    public ActivitatiSecundare srl5(Srl srl) {
        this.setSrl5(srl);
        return this;
    }

    public Set<Sediul> getSediulies() {
        return this.sediulies;
    }

    public void setSediulies(Set<Sediul> sediuls) {
        if (this.sediulies != null) {
            this.sediulies.forEach(i -> i.removeActprinc2(this));
        }
        if (sediuls != null) {
            sediuls.forEach(i -> i.addActprinc2(this));
        }
        this.sediulies = sediuls;
    }

    public ActivitatiSecundare sediulies(Set<Sediul> sediuls) {
        this.setSediulies(sediuls);
        return this;
    }

    public ActivitatiSecundare addSediuly(Sediul sediul) {
        this.sediulies.add(sediul);
        sediul.getActprinc2s().add(this);
        return this;
    }

    public ActivitatiSecundare removeSediuly(Sediul sediul) {
        this.sediulies.remove(sediul);
        sediul.getActprinc2s().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ActivitatiSecundare)) {
            return false;
        }
        return id != null && id.equals(((ActivitatiSecundare) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ActivitatiSecundare{" +
            "id=" + getId() +
            ", codCAEN='" + getCodCAEN() + "'" +
            ", denumirea='" + getDenumirea() + "'" +
            "}";
    }
}
