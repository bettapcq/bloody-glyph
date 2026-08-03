package bettapcq.bloodyglyph.repositories;

import bettapcq.bloodyglyph.entities.QrCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QrCodesRepository extends JpaRepository<QrCode, Long> {

    List<QrCode> findByUserUserId(Long userId);
}
