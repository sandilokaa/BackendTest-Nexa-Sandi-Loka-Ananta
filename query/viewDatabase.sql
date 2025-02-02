use gmedia_democase;

CREATE VIEW karyawan_sandi_loka AS
SELECT 
    nip, 
    nama, 
    alamat, 
    CASE 
        WHEN gend = 'L' THEN 'Laki - Laki'
        WHEN gend = 'P' THEN 'Perempuan'
        ELSE 'Tidak Diketahui' 
    END AS Gend, 
    DATE_FORMAT(tgl_lahir , '%d %M %Y') AS `Tanggal Lahir`
FROM karyawan;

SELECT * from karyawan_sandi_loka;
