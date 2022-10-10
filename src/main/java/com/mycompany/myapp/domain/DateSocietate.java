package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DateSocietate.
 */
@Entity
@Table(name = "date_societate")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DateSocietate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "denumire")
    private String denumire;

    @Column(name = "cui")
    private String cui;

    @Column(name = "reg_comert")
    private String regComert;

    @Column(name = "adresa_sediu")
    private String adresaSediu;

    @ManyToOne
    @JsonIgnoreProperties(value = { "buletins", "datesocietates", "domiciliuls", "dateasociatis", "srl" }, allowSetters = true)
    private AsocAdmin asocadmin2;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DateSocietate id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDenumire() {
        return this.denumire;
    }

    public DateSocietate denumire(String denumire) {
        this.setDenumire(denumire);
        return this;
    }

    public void setDenumire(String denumire) {
        this.denumire = denumire;
    }

    public String getCui() {
        return this.cui;
    }

    public DateSocietate cui(String cui) {
        this.setCui(cui);
        return this;
    }

    public void setCui(String cui) {
        this.cui = cui;
    }

    public String getRegComert() {
        return this.regComert;
    }

    public DateSocietate regComert(String regComert) {
        this.setRegComert(regComert);
        return this;
    }

    public void setRegComert(String regComert) {
        this.regComert = regComert;
    }

    public String getAdresaSediu() {
        return this.adresaSediu;
    }

    public DateSocietate adresaSediu(String adresaSediu) {
        this.setAdresaSediu(adresaSediu);
        return this;
    }

    public void setAdresaSediu(String adresaSediu) {
        this.adresaSediu = adresaSediu;
    }

    public AsocAdmin getAsocadmin2() {
        return this.asocadmin2;
    }

    public void setAsocadmin2(AsocAdmin asocAdmin) {
        this.asocadmin2 = asocAdmin;
    }

    public DateSocietate asocadmin2(AsocAdmin asocAdmin) {
        this.setAsocadmin2(asocAdmin);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DateSocietate)) {
            return false;
        }
        return id != null && id.equals(((DateSocietate) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DateSocietate{" +
            "id=" + getId() +
            ", denumire='" + getDenumire() + "'" +
            ", cui='" + getCui() + "'" +
            ", regComert='" + getRegComert() + "'" +
            ", adresaSediu='" + getAdresaSediu() + "'" +
            "}";
    }
}
