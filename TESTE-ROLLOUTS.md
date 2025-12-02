# Teste Rápido - Argo Rollouts

## ✅ Implementação Completa

**Status**: Argo Rollouts instalado e configurado com sucesso!

### Ambientes Configurados

- **DEV**: Estratégia BlueGreen (auto-promoção desabilitada)
- **PROD**: Estratégia Canary (promoção progressiva)

---

## 🚀 Teste Rápido

### 1. Instalar o Plugin kubectl (Recomendado)

**Windows (PowerShell como Admin):**

```powershell
Invoke-WebRequest -Uri https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-windows-amd64 -OutFile kubectl-argo-rollouts.exe
Move-Item kubectl-argo-rollouts.exe C:\Windows\System32\
```

**Linux/Mac:**

```bash
curl -LO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64
chmod +x kubectl-argo-rollouts-linux-amd64
sudo mv kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts
```

### 2. Abrir Dashboard (MELHOR para apresentação)

```bash
kubectl argo rollouts dashboard
```

Acesse: **http://localhost:3100**

---

## 📋 Comandos Essenciais

### Ver Status dos Rollouts

```bash
# DEV (BlueGreen)
kubectl argo rollouts get rollout ivodocker-dev -n dev --watch

# PROD (Canary)
kubectl argo rollouts get rollout ivodocker-prod -n prod --watch
```

### DEV - BlueGreen (Promoção Manual)

```bash
# Após deploy, promover nova versão
kubectl argo rollouts promote ivodocker-dev -n dev

# Abortar se necessário
kubectl argo rollouts abort ivodocker-dev -n dev

# Rollback
kubectl argo rollouts undo ivodocker-dev -n dev
```

### PROD - Canary (Controle de Tráfego)

```bash
# Promover para próximo step (20% → 40% → 60% → 80% → 100%)
kubectl argo rollouts promote ivodocker-prod -n prod

# Ajustar tráfego manualmente (para demo)
kubectl argo rollouts set weight ivodocker-prod 30 -n prod

# Promover tudo de uma vez
kubectl argo rollouts promote ivodocker-prod -n prod --full

# Abortar
kubectl argo rollouts abort ivodocker-prod -n prod
```

---

## 🎬 Para Apresentação

### Opção 1: Dashboard Visual (Recomendado)

```bash
kubectl argo rollouts dashboard
```

1. Abra http://localhost:3100
2. Selecione o namespace (dev ou prod)
3. Clique no rollout para ver detalhes
4. Use botões na interface para promover/abortar

### Opção 2: Terminal com Watch

```bash
# Em um terminal
kubectl argo rollouts get rollout ivodocker-dev -n dev --watch

# Em outro terminal, faça mudanças e promova
kubectl argo rollouts promote ivodocker-dev -n dev
```

---

## 🧪 Simular um Deploy

### DEV (BlueGreen)

1. Fazer uma mudança no código e commitar
2. CI/CD vai gerar nova imagem
3. ArgoCD detecta mudança e cria preview
4. **Testar preview** (opcional):
   ```bash
   kubectl port-forward service/ivodocker-dev-preview 3001:80 -n dev
   ```
5. **Promover manualmente**:
   ```bash
   kubectl argo rollouts promote ivodocker-dev -n dev
   ```

### PROD (Canary)

1. Fazer mudança e commitar
2. CI/CD gera nova imagem
3. ArgoCD inicia rollout com 20% de tráfego
4. **Verificar status**:
   ```bash
   kubectl argo rollouts get rollout ivodocker-prod -n prod
   ```
5. **Promover step a step**:
   ```bash
   kubectl argo rollouts promote ivodocker-prod -n prod
   # Repetir até 100%
   ```

---

## 📊 Verificar Estado Atual

```bash
# Ver todos os rollouts
kubectl get rollouts --all-namespaces

# Ver services
kubectl get svc -n dev | grep ivodocker
kubectl get svc -n prod | grep ivodocker

# Ver pods
kubectl get pods -n dev -l app.kubernetes.io/name=ivodocker-chart
kubectl get pods -n prod -l app.kubernetes.io/name=ivodocker-chart
```

---

## 🔧 Troubleshooting

### Rollout não está sendo criado

Verifique se rollout.enabled está true nos values:

```bash
helm get values ivodocker-dev -n dev
helm get values ivodocker-prod -n prod
```

### Forçar novo rollout

```bash
kubectl argo rollouts restart ivodocker-dev -n dev
kubectl argo rollouts restart ivodocker-prod -n prod
```

### Ver logs detalhados

```bash
kubectl logs -n argo-rollouts -l app.kubernetes.io/name=argo-rollouts -f
```

---

## 📚 Documentação Completa

Veja `ARGO-ROLLOUTS.md` para documentação completa com todos os comandos e cenários.

---

## ✨ Recursos da Implementação

### DEV (BlueGreen)

- ✅ Auto-promoção **desabilitada** (requer ação manual)
- ✅ Preview service para testes
- ✅ Active service para versão em produção
- ✅ Scale down após 30 segundos da promoção

### PROD (Canary)

- ✅ Progressão: 20% → 40% → 60% → 80% → 100%
- ✅ Pausas automáticas e manuais
- ✅ MaxSurge de 25% (permite pods extras)
- ✅ Zero downtime durante rollout

---

## 🎯 Próximos Passos

1. [ ] Instalar plugin kubectl-argo-rollouts
2. [ ] Abrir dashboard: `kubectl argo rollouts dashboard`
3. [ ] Fazer uma mudança no código para testar
4. [ ] Demonstrar promoção manual (DEV)
5. [ ] Demonstrar controle de tráfego (PROD)

kubectl port-forward svc/argocd-server -n argocd 8080:443

kubectl get pods -n <namespace> -w