<?php

namespace App\Controller;

use App\Entity\Profesor;
use App\Repository\ProfesorRepository;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ProfesorController extends AbstractController{

    /*Constructor de Profesor Repository y entity manager definido*/
    private $profesorRepository;
    private $em;

    public function __construct(ProfesorRepository $profesorRepository, EntityManagerInterface $em)
    {
        $this->profesorRepository = $profesorRepository;
        $this->em = $em;
    }

    /*Crear Profesor*/
    #[Route('/profesor/', methods: ['POST'])]
        public function createProfesor(Request $request)
    {
        $profesor = new Profesor();
        $response = new JsonResponse();

        $nombre = $request->get('nombre');
        $apellidos = $request->get('apellidos');
        $fecha_nacimiento = DateTime::createFromFormat('d-m-Y', $request->get('fecha_nacimiento'));
        $direccion = $request->get('direccion');
        $telefono = $request->get('telefono');
        $codigo_postal = $request->get('codigo_postal');
        $email = $request->get('email');
        $especialidad = $request->get('especialidad');

        if (empty($request->get('nombre'))) {
            $response->setData([
                `success` => false,
                'error' => 'Campo Nombre no puede estar vacio',
                'data' => null
            ]);
            return $response;
        } else {
            $profesor->setNombre($nombre);
        }

        if (empty($request->get('apellidos'))) {
            $response->setData([
                `success` => false,
                'error' => 'Campo Apellidos no puede estar vacio',
                'data' => null
            ]);
            return $response;
        } else {
            $profesor->setApellidos($apellidos);
        }

        if ((DateTime::createFromFormat('d-m-Y', $request->get('fecha_nacimiento')))) {
            $profesor->setFechaNacimiento($fecha_nacimiento);
        }

        if (!empty($request->get('direccion'))) {
            $profesor->setDireccion($direccion);
        }

        if (!empty($request->get('telefono'))) {
            $profesor->setTelefono($telefono);
        }

        if (!empty($request->get('codigo_postal'))) {
            $profesor->setCodigoPostal($codigo_postal);
        }

        if (!empty($request->get('email'))) {
            $profesor->setEmail($email);
        }

        if (empty($request->get('especialidad'))) {
            $response->setData([
                `success` => false,
                'error' => 'Campo Especialidad no puede estar vacio',
                'data' => null
            ]);
            return $response;
        } else {
            $profesor->setEspecialidad($especialidad);
        }

        $this->em->persist($profesor);
        $this->em->flush();

        $response->setData([
            'success' => true,
            'data' => [
                [
                    'id' => $profesor->getId(),
                    'nombre' => $profesor->getNombre(),
                    'apellidos' => $profesor->getApellidos(),
                    'fecha_nacimiento' => $profesor->getFechaNacimiento(),
                    'direccion' => $profesor->getDireccion(),
                    'telefono' => $profesor->getTelefono(),
                    'codigo_postal' => $profesor->getCodigoPostal(),
                    'email' => $profesor->getEmail(),
                    'especialidad' => $profesor->getEspecialidad()
                ]
            ]
        ]);

        return $response;
    }

    /*Solicitar info de un profesor*/
    #[Route('/profesor/{id}', methods: ['GET'])]
    public function buscarprofesor($id): JsonResponse
    {
        $profesores = $this->profesorRepository->find($id);
        $response = new JsonResponse();

        if (!$profesores) {
            $response->setData([
                'success' => false,
                'error' => "Profesor con id $id no existe",
                'data' => null
            ]);
        } else{
            $response->setData([
                'success' => true,
                'data' => [
                    [
                        'id' => $profesores->getId(),
                        'nombre' => $profesores->getNombre(),
                        'apellidos' => $profesores->getApellidos(),
                        'fecha_nacimiento' => $profesores->getFechaNacimiento(),
                        'direccion' => $profesores->getDireccion(),
                        'telefono' => $profesores->getTelefono(),
                        'codigo_postal' => $profesores->getCodigoPostal(),
                        'email' => $profesores->getEmail(),
                        'especialidad' => $profesores->getEspecialidad()
                    ]
                ]
            ]);
        }
        return $response;
    }

    /*Modificar un profesor*/
    #[Route('/profesor/{id}', methods: ['PUT'])]
    public function updateProfesor($id, Request $request): JsonResponse
    {

        $profesorUP = $this->profesorRepository->find($id);
        $resultRequest = json_decode($request->getContent());
        $response = new JsonResponse();

        if (!$profesorUP) {
            $response->setData([
                'success' => false,
                'error' => "Estudiante con id $id no existe",
                'data' => null
            ]);

        } else {
            /*Nombre*/
            if (isset($resultRequest->nombre)) {
                if ($resultRequest->nombre != $profesorUP->getNombre()) {
                    $profesorUP->setNombre($resultRequest->nombre);
                }

                /*Apellidos*/
                if (isset($resultRequest->apellidos)) {
                    if ($resultRequest->apellidos != $profesorUP->getApellidos()) {
                        $profesorUP->setApellidos($resultRequest->apellidos);
                    }
                }

                /*Fecha de nacimiento*/
                if (isset($resultRequest->fecha_nacimiento)) {
                    if ($resultRequest->fecha_nacimiento != $profesorUP->getFechaNacimiento()) {
                        $profesorUP->setFechaNacimiento((DateTime::createFromFormat('d-m-Y', $resultRequest->fecha_nacimiento)));
                    }
                }

                /*Direccion*/
                if (isset($resultRequest->direccion)) {
                    if ($resultRequest->direccion != $profesorUP->getDireccion()) {
                        $profesorUP->setDireccion($resultRequest->direccion);
                    }
                }
                /*Telefono*/
                if (isset($resultRequest->telefono)) {
                    if ($resultRequest->telefono != $profesorUP->getTelefono()) {
                        $profesorUP->setTelefono($resultRequest->telefono);
                    }
                }
                /*Codigo Postal*/
                if (isset($resultRequest->codigo_postal)) {
                    if ($resultRequest->codigo_postal != $profesorUP->getCodigoPostal()) {
                        $profesorUP->setCodigoPostal($resultRequest->codigo_postal);
                    }
                }
                /*Email*/
                if (isset($resultRequest->email)) {
                    if ($resultRequest->email != $profesorUP->getEmail()) {
                        $profesorUP->setEmail($resultRequest->email);
                    }
                }
                /*Especialidad*/
                if (isset($resultRequest->especialidad)){
                    if ($resultRequest->especialidad != $profesorUP->getEspecialidad()){
                        $profesorUP->setEspecialidad($resultRequest->especialidad);
                    }
                }

                $this->em->persist($profesorUP);
                $this->em->flush();

                $response->setData([
                    'success' => true,
                    'data' => [
                        [
                            'id' => $profesorUP->getId(),
                            'nombre' => $profesorUP->getNombre(),
                            'apellidos' => $profesorUP->getApellidos(),
                            'fecha_nacimiento' => $profesorUP->getFechaNacimiento(),
                            'direccion' => $profesorUP->getDireccion(),
                            'telefono' => $profesorUP->getTelefono(),
                            'codigo_postal' => $profesorUP->getCodigoPostal(),
                            'email' => $profesorUP->getEmail(),
                            'especialidad' => $profesorUP->getEspecialidad()
                        ]
                    ]
                ]);
            }
        }
        return $response;
    }

    /*Borrar un profesor*/
    #[Route('/profesor/{id}', methods: ['DELETE'])]
    public function deleteProfesor($id): JsonResponse{

        $profesordel = $this->profesorRepository->find($id);
        $response = new JsonResponse();

        if (!$profesordel) {
            $response->setData([
                'success' => false,
                'error' => "Profesor con id $id no existe",
                'data' => null
            ]);
        } else {
            $this->em->remove($profesordel);
            $this->em->flush();

            $response->setData([
                'success' => true,
                'echo' => "Profesor con id $id ha sido eliminado",
                'data' => [
                    [
                        'id' => $profesordel->getId(),
                        'nombre' => $profesordel->getNombre(),
                        'apellidos' => $profesordel->getApellidos(),
                        'fecha_nacimiento' => $profesordel->getFechaNacimiento(),
                        'direccion' => $profesordel->getDireccion(),
                        'telefono' => $profesordel->getTelefono(),
                        'codigo_postal' => $profesordel->getCodigoPostal(),
                        'email' => $profesordel->getEmail(),
                        'especialidad' => $profesordel->getEspecialidad()
                    ]
                ]
            ]);
        }
        return $response;
    }
}