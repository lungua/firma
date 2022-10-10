package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SediulTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sediul.class);
        Sediul sediul1 = new Sediul();
        sediul1.setId(1L);
        Sediul sediul2 = new Sediul();
        sediul2.setId(sediul1.getId());
        assertThat(sediul1).isEqualTo(sediul2);
        sediul2.setId(2L);
        assertThat(sediul1).isNotEqualTo(sediul2);
        sediul1.setId(null);
        assertThat(sediul1).isNotEqualTo(sediul2);
    }
}
