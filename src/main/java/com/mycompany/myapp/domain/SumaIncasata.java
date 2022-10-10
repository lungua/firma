package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SumaIncasata.
 */
@Entity
@Table(name = "suma_incasata")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SumaIncasata implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "suma_incasata")
    private Integer sumaIncasata;

    @Column(name = "data_incasarii")
    private LocalDate dataIncasarii;

    @ManyToOne
    @JsonIgnoreProperties(
        value = {
            "asocadmins", "capitalsocials", "alteactivitatis", "activitatiprincipales", "activitatisecundares", "sedius", "sumaincasatas",
        },
        allowSetters = true
    )
    private Srl srl5;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SumaIncasata id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSumaIncasata() {
        return this.sumaIncasata;
    }

    public SumaIncasata sumaIncasata(Integer sumaIncasata) {
        this.setSumaIncasata(sumaIncasata);
        return this;
    }

    public void setSumaIncasata(Integer sumaIncasata) {
        this.sumaIncasata = sumaIncasata;
    }

    public LocalDate getDataIncasarii() {
        return this.dataIncasarii;
    }

    public SumaIncasata dataIncasarii(LocalDate dataIncasarii) {
        this.setDataIncasarii(dataIncasarii);
        return this;
    }

    public void setDataIncasarii(LocalDate dataIncasarii) {
        this.dataIncasarii = dataIncasarii;
    }

    public Srl getSrl5() {
        return this.srl5;
    }

    public void setSrl5(Srl srl) {
        this.srl5 = srl;
    }

    public SumaIncasata srl5(Srl srl) {
        this.setSrl5(srl);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SumaIncasata)) {
            return false;
        }
        return id != null && id.equals(((SumaIncasata) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SumaIncasata{" +
            "id=" + getId() +
            ", sumaIncasata=" + getSumaIncasata() +
            ", dataIncasarii='" + getDataIncasarii() + "'" +
            "}";
    }
}
