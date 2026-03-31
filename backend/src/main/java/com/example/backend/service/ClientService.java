package com.example.backend.service;

import com.example.backend.exception.ClientNotFoundException;
import com.example.backend.exception.ExceptionMessages;
import com.example.backend.model.Client;
import com.example.backend.repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clientRepository;

    public Client createClient(Client client) {
        return clientRepository.save(client);
     }

     public Client updateClient(Long id, Client client) {
      Client existingClient = clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException(ExceptionMessages.CLIENT_NOT_FOUND + id));

      existingClient.setName(client.getName());
      existingClient.setEmail(client.getEmail());
      existingClient.setPhone(client.getPhone());

      return clientRepository.save(existingClient);
     }

     public void deleteClient(Long id) {
        Client existingClient = clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException(ExceptionMessages.CLIENT_NOT_FOUND + id));
        clientRepository.deleteById(id);
     }

     public List<Client> getAllClients() {
      return clientRepository.findAll();
     }

     public Client getClientById(Long id) {
      return clientRepository.findById(id).orElseThrow(() -> new ClientNotFoundException(ExceptionMessages.CLIENT_NOT_FOUND + id));

    }
}
