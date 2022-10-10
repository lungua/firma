package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DateAsociatiTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DateAsociati.class);
        DateAsociati dateAsociati1 = new DateAsociati();
        dateAsociati1.setId(1L);
        DateAsociati dateAsociati2 = new DateAsociati();
        dateAsociati2.setId(dateAsociati1.getId());
        assertThat(dateAsociati1).isEqualTo(dateAsociati2);
        dateAsociati2.setId(2L);
        assertThat(dateAsociati1).isNotEqualTo(dateAsociati2);
        dateAsociati1.setId(null);
        assertThat(dateAsociati1).isNotEqualTo(dateAsociati2);
    }
}
