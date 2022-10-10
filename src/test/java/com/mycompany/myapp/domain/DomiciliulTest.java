package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DomiciliulTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Domiciliul.class);
        Domiciliul domiciliul1 = new Domiciliul();
        domiciliul1.setId(1L);
        Domiciliul domiciliul2 = new Domiciliul();
        domiciliul2.setId(domiciliul1.getId());
        assertThat(domiciliul1).isEqualTo(domiciliul2);
        domiciliul2.setId(2L);
        assertThat(domiciliul1).isNotEqualTo(domiciliul2);
        domiciliul1.setId(null);
        assertThat(domiciliul1).isNotEqualTo(domiciliul2);
    }
}
