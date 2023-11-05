# Devoir Docker - Maxime Malherbe

## 1. Introduction

Le projet développé est une TodoList simple.

Il est composé de :

- Un front sous VueJS
- Une API sous NestJS avec TypeORM
- Une base de données MySQL.

## 2. Commandes de déploiement et gestion de la stack docker

Nécessite docker, docker-compose et make.

**Déploiement de la stack :**

```bash
make up
```

---

**Suppression de la stack :**

```bash
make down
```

---

**Arrêt des containers de la stack :**

```bash
make stop
```

---

**Démarrage des containers de la stack :**

```bash
make start
```

---

**Redémarrage des containers de la stack :**

```bash
make restart
```

---

**Rebuild des images :**

```bash
make rebuild
```

---

**Rebuild des images sans le cache :**

```bash
make force-rebuild
```

---

**Suppression de la stack + suppression des images :**

```bash
make delete-all
```

---

## 3. Déploiement kubernetes avec minikube

Nécessite minikube, kubectl et make.

### 1. Lancer minikube

Démarrer minikube

```bash
minikube start
```

### 2. Déployer la stack

**Déploiement de la stack :**

```bash
make kube
```

---

**Suppression de la stack :**

```bash
make kube-delete
```

---

## 4. Problèmes rencontrés

### Minikube

Impossibilité pour kubernetes de récupérer les images depuis la machine hôte.
![Image dashboard Minikube](https://www.dropbox.com/scl/fi/eaid2cy0jpl8gzyltp6cr/minikube-dashboard.png?rlkey=maz7z0a99bl2qcrqlr7lhtqe6&dl=1)
<span style="color:red">Failed to pull image "goramax/api:latest": rpc error: code = Unknown desc = Error response from daemon: pull access denied for goramax/api, repository does not exist or may require 'docker login': denied: requested access to the resource is denied</span>

Je n'ai pas pu terminer le déploiement de la stack sur kubernetes.

---

### SIGTERM

Lors de l'arrêt des containers, l'API et le Front ne s'arrêtent pas correctement.
Docker me retourne Exit(137), ce qui correspond à un SIGKILL.

Les containers sont pourtant basés sur des images NodeJS et Nginx qui sont censées gérer correctement les SIGTERM.

Je me suis demandé si le entrypoint.sh ne lançait pas un terminal intermédiaire qui ne transmettait pas le SIGTERM à l'application.
Alors j'ai donc essayé pour le front de retirer le entrypoint.sh afin de laisser le entrypoint de base de l'image nginx, mais cela ne change rien et j'ai toujours le code d'erreur 137.