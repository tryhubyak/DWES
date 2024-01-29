<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231119165758 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE profesor');
        $this->addSql('ALTER TABLE estudiante CHANGE fecha_nacimiento fecha_nacimiento DATETIME DEFAULT NULL, CHANGE direccion direccion VARCHAR(255) DEFAULT NULL, CHANGE telefono telefono INT DEFAULT NULL, CHANGE codigo_postal codigo_postal INT DEFAULT NULL, CHANGE email email VARCHAR(255) DEFAULT NULL, CHANGE apellido apellidos VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE profesor (id INT AUTO_INCREMENT NOT NULL, nombre VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, apellido VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, fecha_nacimiento DATETIME NOT NULL, direccion VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, telefono INT NOT NULL, codigo_postal INT NOT NULL, email VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, especialidad VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB COMMENT = \'\' ');
        $this->addSql('ALTER TABLE estudiante CHANGE fecha_nacimiento fecha_nacimiento DATETIME NOT NULL, CHANGE direccion direccion VARCHAR(255) NOT NULL, CHANGE telefono telefono INT NOT NULL, CHANGE codigo_postal codigo_postal INT NOT NULL, CHANGE email email VARCHAR(255) NOT NULL, CHANGE apellidos apellido VARCHAR(255) NOT NULL');
    }
}
