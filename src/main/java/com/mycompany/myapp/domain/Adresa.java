package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Adresa.
 */
@Entity
@Table(name = "adresa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Adresa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "strada")
    private String strada;

    @Column(name = "numarul")
    private String numarul;

    @Column(name = "localitatea")
    private String localitatea;

    @Column(name = "judetul")
    private String judetul;

    @Column(name = "bloc")
    private String bloc;

    @Column(name = "scara")
    private String scara;

    @Column(name = "etaj")
    private String etaj;

    @Column(name = "apartament")
    private String apartament;

    @Column(name = "alte_detalii")
    private String alteDetalii;

    @Column(name = "asociatie_locatari")
    private Boolean asociatieLocatari;

    @ManyToOne
    @JsonIgnoreProperties(value = { "adresas", "dovadas", "proprietaris", "actprinc1s", "actprinc2s", "srl4" }, allowSetters = true)
    private Sediul sediu1;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Adresa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStrada() {
        return this.strada;
    }

    public Adresa strada(String strada) {
        this.setStrada(strada);
        return this;
    }

    public void setStrada(String strada) {
        this.strada = strada;
    }

    public String getNumarul() {
        return this.numarul;
    }

    public Adresa numarul(String numarul) {
        this.setNumarul(numarul);
        return this;
    }

    public void setNumarul(String numarul) {
        this.numarul = numarul;
    }

    public String getLocalitatea() {
        return this.localitatea;
    }

    public Adresa localitatea(String localitatea) {
        this.setLocalitatea(localitatea);
        return this;
    }

    public void setLocalitatea(String localitatea) {
        this.localitatea = localitatea;
    }

    public String getJudetul() {
        return this.judetul;
    }

    public Adresa judetul(String judetul) {
        this.setJudetul(judetul);
        return this;
    }

    public void setJudetul(String judetul) {
        this.judetul = judetul;
    }

    public String getBloc() {
        return this.bloc;
    }

    public Adresa bloc(String bloc) {
        this.setBloc(bloc);
        return this;
    }

    public void setBloc(String bloc) {
        this.bloc = bloc;
    }

    public String getScara() {
        return this.scara;
    }

    public Adresa scara(String scara) {
        this.setScara(scara);
        return this;
    }

    public void setScara(String scara) {
        this.scara = scara;
    }

    public String getEtaj() {
        return this.etaj;
    }

    public Adresa etaj(String etaj) {
        this.setEtaj(etaj);
        return this;
    }

    public void setEtaj(String etaj) {
        this.etaj = etaj;
    }

    public String getApartament() {
        return this.apartament;
    }

    public Adresa apartament(String apartament) {
        this.setApartament(apartament);
        return this;
    }

    public void setApartament(String apartament) {
        this.apartament = apartament;
    }

    public String getAlteDetalii() {
        return this.alteDetalii;
    }

    public Adresa alteDetalii(String alteDetalii) {
        this.setAlteDetalii(alteDetalii);
        return this;
    }

    public void setAlteDetalii(String alteDetalii) {
        this.alteDetalii = alteDetalii;
    }

    public Boolean getAsociatieLocatari() {
        return this.asociatieLocatari;
    }

    public Adresa asociatieLocatari(Boolean asociatieLocatari) {
        this.setAsociatieLocatari(asociatieLocatari);
        return this;
    }

    public void setAsociatieLocatari(Boolean asociatieLocatari) {
        this.asociatieLocatari = asociatieLocatari;
    }

    public Sediul getSediu1() {
        return this.sediu1;
    }

    public void setSediu1(Sediul sediul) {
        this.sediu1 = sediul;
    }

    public Adresa sediu1(Sediul sediul) {
        this.setSediu1(sediul);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Adresa)) {
            return false;
        }
        return id != null && id.equals(((Adresa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Adresa{" +
            "id=" + getId() +
            ", strada='" + getStrada() + "'" +
            ", numarul='" + getNumarul() + "'" +
            ", localitatea='" + getLocalitatea() + "'" +
            ", judetul='" + getJudetul() + "'" +
            ", bloc='" + getBloc() + "'" +
            ", scara='" + getScara() + "'" +
            ", etaj='" + getEtaj() + "'" +
            ", apartament='" + getApartament() + "'" +
            ", alteDetalii='" + getAlteDetalii() + "'" +
            ", asociatieLocatari='" + getAsociatieLocatari() + "'" +
            "}";
    }
}
