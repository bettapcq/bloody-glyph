package bettapcq.bloodyglyph.repositories;

import bettapcq.bloodyglyph.entities.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QrCodesRepository extends JpaRepository<QrCode, Long> {

    List<QrCode> findByUserUserId(Long userId);
}
