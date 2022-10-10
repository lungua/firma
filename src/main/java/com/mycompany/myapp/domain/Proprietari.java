package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.FizicJuridic;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Proprietari.
 */
@Entity
@Table(name = "proprietari")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Proprietari implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "fizic_juridic")
    private FizicJuridic fizicJuridic;

    @Column(name = "nume")
    private String nume;

    @Column(name = "prenume")
    private String prenume;

    @Column(name = "tip")
    private String tip;

    @Column(name = "serie")
    private String serie;

    @Column(name = "numar")
    private String numar;

    @Column(name = "cui")
    private String cui;

    @Column(name = "denumire_societate")
    private String denumireSocietate;

    @ManyToOne
    @JsonIgnoreProperties(value = { "adresas", "dovadas", "proprietaris", "actprinc1s", "actprinc2s", "srl4" }, allowSetters = true)
    private Sediul sediu3;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Proprietari id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public FizicJuridic getFizicJuridic() {
        return this.fizicJuridic;
    }

    public Proprietari fizicJuridic(FizicJuridic fizicJuridic) {
        this.setFizicJuridic(fizicJuridic);
        return this;
    }

    public void setFizicJuridic(FizicJuridic fizicJuridic) {
        this.fizicJuridic = fizicJuridic;
    }

    public String getNume() {
        return this.nume;
    }

    public Proprietari nume(String nume) {
        this.setNume(nume);
        return this;
    }

    public void setNume(String nume) {
        this.nume = nume;
    }

    public String getPrenume() {
        return this.prenume;
    }

    public Proprietari prenume(String prenume) {
        this.setPrenume(prenume);
        return this;
    }

    public void setPrenume(String prenume) {
        this.prenume = prenume;
    }

    public String getTip() {
        return this.tip;
    }

    public Proprietari tip(String tip) {
        this.setTip(tip);
        return this;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public String getSerie() {
        return this.serie;
    }

    public Proprietari serie(String serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getNumar() {
        return this.numar;
    }

    public Proprietari numar(String numar) {
        this.setNumar(numar);
        return this;
    }

    public void setNumar(String numar) {
        this.numar = numar;
    }

    public String getCui() {
        return this.cui;
    }

    public Proprietari cui(String cui) {
        this.setCui(cui);
        return this;
    }

    public void setCui(String cui) {
        this.cui = cui;
    }

    public String getDenumireSocietate() {
        return this.denumireSocietate;
    }

    public Proprietari denumireSocietate(String denumireSocietate) {
        this.setDenumireSocietate(denumireSocietate);
        return this;
    }

    public void setDenumireSocietate(String denumireSocietate) {
        this.denumireSocietate = denumireSocietate;
    }

    public Sediul getSediu3() {
        return this.sediu3;
    }

    public void setSediu3(Sediul sediul) {
        this.sediu3 = sediul;
    }

    public Proprietari sediu3(Sediul sediul) {
        this.setSediu3(sediul);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Proprietari)) {
            return false;
        }
        return id != null && id.equals(((Proprietari) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Proprietari{" +
            "id=" + getId() +
            ", fizicJuridic='" + getFizicJuridic() + "'" +
            ", nume='" + getNume() + "'" +
            ", prenume='" + getPrenume() + "'" +
            ", tip='" + getTip() + "'" +
            ", serie='" + getSerie() + "'" +
            ", numar='" + getNumar() + "'" +
            ", cui='" + getCui() + "'" +
            ", denumireSocietate='" + getDenumireSocietate() + "'" +
            "}";
    }
}
