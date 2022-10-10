package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Buletin.
 */
@Entity
@Table(name = "buletin")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Buletin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "tip")
    private String tip;

    @Column(name = "serie")
    private String serie;

    @Column(name = "numar")
    private String numar;

    @Size(max = 13)
    @Column(name = "cnp", length = 13)
    private String cnp;

    @Column(name = "tara")
    private String tara;

    @Column(name = "judet")
    private String judet;

    @Column(name = "localitate")
    private String localitate;

    @Column(name = "cetatenie")
    private String cetatenie;

    @Column(name = "data")
    private Instant data;

    @Column(name = "eliberat_de")
    private String eliberatDe;

    @ManyToOne
    @JsonIgnoreProperties(value = { "buletins", "datesocietates", "domiciliuls", "dateasociatis", "srl" }, allowSetters = true)
    private AsocAdmin asocadmin1;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Buletin id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTip() {
        return this.tip;
    }

    public Buletin tip(String tip) {
        this.setTip(tip);
        return this;
    }

    public void setTip(String tip) {
        this.tip = tip;
    }

    public String getSerie() {
        return this.serie;
    }

    public Buletin serie(String serie) {
        this.setSerie(serie);
        return this;
    }

    public void setSerie(String serie) {
        this.serie = serie;
    }

    public String getNumar() {
        return this.numar;
    }

    public Buletin numar(String numar) {
        this.setNumar(numar);
        return this;
    }

    public void setNumar(String numar) {
        this.numar = numar;
    }

    public String getCnp() {
        return this.cnp;
    }

    public Buletin cnp(String cnp) {
        this.setCnp(cnp);
        return this;
    }

    public void setCnp(String cnp) {
        this.cnp = cnp;
    }

    public String getTara() {
        return this.tara;
    }

    public Buletin tara(String tara) {
        this.setTara(tara);
        return this;
    }

    public void setTara(String tara) {
        this.tara = tara;
    }

    public String getJudet() {
        return this.judet;
    }

    public Buletin judet(String judet) {
        this.setJudet(judet);
        return this;
    }

    public void setJudet(String judet) {
        this.judet = judet;
    }

    public String getLocalitate() {
        return this.localitate;
    }

    public Buletin localitate(String localitate) {
        this.setLocalitate(localitate);
        return this;
    }

    public void setLocalitate(String localitate) {
        this.localitate = localitate;
    }

    public String getCetatenie() {
        return this.cetatenie;
    }

    public Buletin cetatenie(String cetatenie) {
        this.setCetatenie(cetatenie);
        return this;
    }

    public void setCetatenie(String cetatenie) {
        this.cetatenie = cetatenie;
    }

    public Instant getData() {
        return this.data;
    }

    public Buletin data(Instant data) {
        this.setData(data);
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public String getEliberatDe() {
        return this.eliberatDe;
    }

    public Buletin eliberatDe(String eliberatDe) {
        this.setEliberatDe(eliberatDe);
        return this;
    }

    public void setEliberatDe(String eliberatDe) {
        this.eliberatDe = eliberatDe;
    }

    public AsocAdmin getAsocadmin1() {
        return this.asocadmin1;
    }

    public void setAsocadmin1(AsocAdmin asocAdmin) {
        this.asocadmin1 = asocAdmin;
    }

    public Buletin asocadmin1(AsocAdmin asocAdmin) {
        this.setAsocadmin1(asocAdmin);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Buletin)) {
            return false;
        }
        return id != null && id.equals(((Buletin) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Buletin{" +
            "id=" + getId() +
            ", tip='" + getTip() + "'" +
            ", serie='" + getSerie() + "'" +
            ", numar='" + getNumar() + "'" +
            ", cnp='" + getCnp() + "'" +
            ", tara='" + getTara() + "'" +
            ", judet='" + getJudet() + "'" +
            ", localitate='" + getLocalitate() + "'" +
            ", cetatenie='" + getCetatenie() + "'" +
            ", data='" + getData() + "'" +
            ", eliberatDe='" + getEliberatDe() + "'" +
            "}";
    }
}
