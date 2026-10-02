# Configuração de Secrets no Kubernetes

## ⚠️ Importante - Segurança

As senhas **NÃO devem** ficar hardcoded nos arquivos `values.yaml` commitados no Git.

## 📋 Solução Recomendada

### Opção 1: Criar Secrets Manualmente no Cluster (Recomendado para Produção)

#### DEV

```bash
kubectl create secret generic ivodocker-dev-ivodocker-chart-db-credentials \
  --from-literal=DB_HOST=mysql-dev \
  --from-literal=DB_USER=root \
  --from-literal=DB_PASSWORD='SUA_SENHA_SEGURA_AQUI' \
  --from-literal=DB_NAME=ivodocker_dev \
  -n dev
```

#### PROD

```bash
kubectl create secret generic ivodocker-prod-ivodocker-chart-db-credentials \
  --from-literal=DB_HOST=mysql-prod \
  --from-literal=DB_USER=root \
  --from-literal=DB_PASSWORD='SUA_SENHA_SEGURA_AQUI' \
  --from-literal=DB_NAME=ivodocker_prod \
  -n prod
```

### Opção 2: Usar Sealed Secrets (Recomendado para GitOps)

Instale o Sealed Secrets Controller:

```bash
kubectl apply -f https://github.com/bitnami-labs/sealed-secrets/releases/download/v0.24.0/controller.yaml
```

Crie um secret normal e converta para sealed:

```bash
# Criar secret temporário
kubectl create secret generic db-credentials \
  --from-literal=DB_HOST=mysql-dev \
  --from-literal=DB_PASSWORD='senha123' \
  --dry-run=client -o yaml > /tmp/secret.yaml

# Converter para sealed secret
kubeseal -f /tmp/secret.yaml -w sealed-secret.yaml

# Aplicar o sealed secret (pode commitar no Git!)
kubectl apply -f sealed-secret.yaml
```

### Opção 3: Usar External Secrets Operator

Para integração com AWS Secrets Manager, Azure Key Vault, etc.

### Opção 4: Valores via Helm Install (Temporário/Dev)

```bash
# DEV
helm upgrade --install ivodocker-dev ./helm/ivodocker-chart \
  -f helm/ivodocker-chart/values-dev.yaml \
  --set dbCredentials.DB_PASSWORD='SenhaSegura123!' \
  -n dev

# PROD
helm upgrade --install ivodocker-prod ./helm/ivodocker-chart \
  -f helm/ivodocker-chart/values-prod.yaml \
  --set dbCredentials.DB_PASSWORD='SenhaSegura123!' \
  -n prod
```

## 🔒 Atualizando values.yaml

**Remova as senhas dos arquivos values:**

### values-dev.yaml

```yaml
dbCredentials:
  DB_HOST: "mysql-dev"
  DB_USER: "root"
  DB_PASSWORD: "CHANGE_ME" # Será sobrescrito pelo secret manual
  DB_NAME: "ivodocker_dev"
```

### values-prod.yaml

```yaml
dbCredentials:
  DB_HOST: "mysql-prod"
  DB_USER: "root"
  DB_PASSWORD: "CHANGE_ME" # Será sobrescrito pelo secret manual
  DB_NAME: "ivodocker_prod"
```

## 🎯 Para o Projeto Acadêmico

**Opção Simples (para demonstração):**

1. Crie os secrets manualmente antes de sincronizar o ArgoCD:

```bash
# DEV
kubectl create secret generic ivodocker-dev-ivodocker-chart-db-credentials \
  --from-literal=DB_HOST=mysql-dev \
  --from-literal=DB_USER=root \
  --from-literal=DB_PASSWORD='MyR00tP@ssw0rd' \
  --from-literal=DB_NAME=ivodocker_dev \
  -n dev

# PROD
kubectl create secret generic ivodocker-prod-ivodocker-chart-db-credentials \
  --from-literal=DB_HOST=mysql-prod \
  --from-literal=DB_USER=root \
  --from-literal=DB_PASSWORD='MyR00tP@ssw0rd' \
  --from-literal=DB_NAME=ivodocker_prod \
  -n prod
```

2. Modifique o `secret.yaml` do Helm para **não criar** o secret se ele já existir:

Ver arquivo `helm/ivodocker-chart/templates/secret.yaml` atualizado.

## ✅ Verificar Secrets

```bash
# Listar secrets
kubectl get secrets -n dev
kubectl get secrets -n prod

# Ver conteúdo (decodificado)
kubectl get secret ivodocker-dev-ivodocker-chart-db-credentials -n dev -o jsonpath='{.data.DB_PASSWORD}' | base64 -d
```

## 🔐 Melhores Práticas

1. ✅ **NUNCA** commite senhas em texto plano no Git
2. ✅ Use secrets externos ou sealed secrets
3. ✅ Rotacione senhas periodicamente
4. ✅ Use senhas fortes
5. ✅ Limite acesso aos secrets no cluster (RBAC)
