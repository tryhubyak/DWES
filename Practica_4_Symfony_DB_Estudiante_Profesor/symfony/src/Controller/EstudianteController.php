<?php

namespace App\Controller;

use App\Entity\Estudiante;
use App\Repository\EstudianteRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class EstudianteController extends AbstractController
{
    /*Constructor de Estudiante Repository y entity manager definido*/
    private $estudianteRepository;
    private $em;

    public function __construct(EstudianteRepository $estudianteRepository, EntityManagerInterface $em)
    {
        $this->estudianteRepository = $estudianteRepository;
        $this->em = $em;
    }


    /*Crear estudiante*/
    #[Route('/estudiante/', methods: ['POST'])]
    public function createEstudiante(Request $request)
    {
        $estudiante = new Estudiante();
        $response = new JsonResponse();

        $nombre = $request->get('nombre');
        $apellidos = $request->get('apellidos');
        $fecha_nacimiento = DateTime::createFromFormat('d-m-Y', $request->get('fecha_nacimiento'));
        $direccion = $request->get('direccion');
        $telefono = $request->get('telefono');
        $codigo_postal = $request->get('codigo_postal');
        $email = $request->get('email');

        if (empty($request->get('nombre'))) {
            $response->setData([
                `success` => false,
                'error' => 'Campo Nombre no puede estar vacio',
                'data' => null
            ]);
            return $response;
        } else {
            $estudiante->setNombre($nombre);
        }

        if (empty($request->get('apellidos'))) {
            $response->setData([
                `success` => false,
                'error' => 'Campo Apellidos no puede estar vacio',
                'data' => null
            ]);
            return $response;
        } else {
            $estudiante->setApellidos($apellidos);
        }

        if ((DateTime::createFromFormat('d-m-Y', $request->get('fecha_nacimiento')))) {
            $estudiante->setFechaNacimiento($fecha_nacimiento);
        }

        if (!empty($request->get('direccion'))) {
            $estudiante->setDireccion($direccion);
        }

        if (!empty($request->get('telefono'))) {
            $estudiante->setTelefono($telefono);
        }

        if (!empty($request->get('codigo_postal'))) {
            $estudiante->setCodigoPostal($codigo_postal);
        }

        if (!empty($request->get('email'))) {
            $estudiante->setEmail($email);
        }

        $this->em->persist($estudiante);
        $this->em->flush();

        $response->setData([
            'success' => true,
            'data' => [
                [
                    'id' => $estudiante->getId(),
                    'nombre' => $estudiante->getNombre(),
                    'apellidos' => $estudiante->getApellidos(),
                    'fecha_nacimiento' => $estudiante->getFechaNacimiento(),
                    'direccion' => $estudiante->getDireccion(),
                    'telefono' => $estudiante->getTelefono(),
                    'codigo_postal' => $estudiante->getCodigoPostal(),
                    'email' => $estudiante->getEmail()
                ]
            ]
        ]);

        return $response;
    }

    /*Solicitar info de un estudiante*/
    #[Route('/estudiante/{id}', methods: ['GET'])]
    public function buscarEstudiante($id): JsonResponse
    {
        $estudiantes = $this->estudianteRepository->find($id);
        $response = new JsonResponse();

        if (!$estudiantes) {
            $response->setData([
                'success' => false,
                'error' => "Estudiante con id $id no existe",
                'data' => null
            ]);
        } else{
            $response->setData([
                'success' => true,
                'data' => [
                    [
                        'id' => $estudiantes->getId(),
                        'nombre' => $estudiantes->getNombre(),
                        'apellidos' => $estudiantes->getApellidos(),
                        'fecha_nacimiento' => $estudiantes->getFechaNacimiento(),
                        'direccion' => $estudiantes->getDireccion(),
                        'telefono' => $estudiantes->getTelefono(),
                        'codigo_postal' => $estudiantes->getCodigoPostal(),
                        'email' => $estudiantes->getEmail()
                    ]
                ]
            ]);
        }
        return $response;
    }

    /*Modificar un estudiante*/
    #[Route('/estudiante/{id}', methods: ['PUT'])]
    public function updateEstudiante($id, Request $request): JsonResponse
    {

        $estudianteUP = $this->estudianteRepository->find($id);
        $resultRequest = json_decode($request->getContent());
        $response = new JsonResponse();

        if (!$estudianteUP) {
            $response->setData([
                'success' => false,
                'error' => "Estudiante con id $id no existe",
                'data' => null
            ]);

        } else {
            /*Nombre*/
            if (isset($resultRequest->nombre)) {
                if ($resultRequest->nombre != $estudianteUP->getNombre()) {
                    $estudianteUP->setNombre($resultRequest->nombre);
                }

                /*Apellidos*/
                if (isset($resultRequest->apellidos)) {
                    if ($resultRequest->apellidos != $estudianteUP->getApellidos()) {
                        $estudianteUP->setApellidos($resultRequest->apellidos);
                    }
                }

                /*Fecha de nacimiento*/
                if (isset($resultRequest->fecha_nacimiento)) {
                    if ($resultRequest->fecha_nacimiento != $estudianteUP->getFechaNacimiento()) {
                        $estudianteUP->setFechaNacimiento((DateTime::createFromFormat('d-m-Y', $resultRequest->fecha_nacimiento)));
                    }
                }

                /*Direccion*/
                if (isset($resultRequest->direccion)) {
                    if ($resultRequest->direccion != $estudianteUP->getDireccion()) {
                        $estudianteUP->setDireccion($resultRequest->direccion);
                    }
                }
                /*Telefono*/
                if (isset($resultRequest->telefono)) {
                    if ($resultRequest->telefono != $estudianteUP->getTelefono()) {
                        $estudianteUP->setTelefono($resultRequest->telefono);
                    }
                }
                /*Codigo Postal*/
                if (isset($resultRequest->codigo_postal)) {
                    if ($resultRequest->codigo_postal != $estudianteUP->getCodigoPostal()) {
                        $estudianteUP->setCodigoPostal($resultRequest->codigo_postal);
                    }
                }
                /*Email*/
                if (isset($resultRequest->email)) {
                    if ($resultRequest->email != $estudianteUP->getEmail()) {
                        $estudianteUP->setEmail($resultRequest->email);
                    }
                }

                $this->em->persist($estudianteUP);
                $this->em->flush();

                $response->setData([
                    'success' => true,
                    'data' => [
                        [
                            'id' => $estudianteUP->getId(),
                            'nombre' => $estudianteUP->getNombre(),
                            'apellidos' => $estudianteUP->getApellidos(),
                            'fecha_nacimiento' => $estudianteUP->getFechaNacimiento(),
                            'direccion' => $estudianteUP->getDireccion(),
                            'telefono' => $estudianteUP->getTelefono(),
                            'codigo_postal' => $estudianteUP->getCodigoPostal(),
                            'email' => $estudianteUP->getEmail()
                        ]
                    ]
                ]);
            }
        }
        return $response;
    }

    /*Borrar un estudiante*/
    #[Route('/estudiante/{id}', methods: ['DELETE'])]
    public function deleteEstudiante($id): JsonResponse{

        $estudiantedel = $this->estudianteRepository->find($id);
        $response = new JsonResponse();

        if (!$estudiantedel) {
            $response->setData([
                'success' => false,
                'error' => "Estudiante con id $id no existe",
                'data' => null
            ]);
        } else {
            $this->em->remove($estudiantedel);
            $this->em->flush();
            
            $response->setData([
                'success' => true,
                'echo' => "Estudiante con id $id ha sido eliminado",
                'data' => [
                    [
                        'id' => $estudiantedel->getId(),
                        'nombre' => $estudiantedel->getNombre(),
                        'apellidos' => $estudiantedel->getApellidos(),
                        'fecha_nacimiento' => $estudiantedel->getFechaNacimiento(),
                        'direccion' => $estudiantedel->getDireccion(),
                        'telefono' => $estudiantedel->getTelefono(),
                        'codigo_postal' => $estudiantedel->getCodigoPostal(),
                        'email' => $estudiantedel->getEmail()
                    ]
                ]
            ]);
        }
        return $response;
    }

}

