# Argo Rollouts - Guia de Uso

Este documento descreve como usar as estratégias de deployment BlueGreen e Canary implementadas com Argo Rollouts.

## Instalação do Plugin kubectl (Opcional mas Recomendado)

Para facilitar o gerenciamento dos rollouts, instale o plugin kubectl:

```bash
# Linux/Mac
curl -LO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64
chmod +x kubectl-argo-rollouts-linux-amd64
sudo mv kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts

# Windows (PowerShell)
Invoke-WebRequest -Uri https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-windows-amd64 -OutFile kubectl-argo-rollouts.exe
Move-Item kubectl-argo-rollouts.exe C:\Windows\System32\
```

## Ambiente DEV - Estratégia BlueGreen

### Características

- **Auto-promoção**: DESABILITADA (requer aprovação manual)
- **Preview Service**: `ivodocker-dev-preview`
- **Active Service**: `ivodocker-dev`

### Comandos Importantes

#### 1. Ver status do rollout

```bash
kubectl argo rollouts get rollout ivodocker-dev -n default
# ou sem plugin:
kubectl get rollout ivodocker-dev -n default
```

#### 2. Acompanhar o rollout em tempo real

```bash
kubectl argo rollouts get rollout ivodocker-dev -n default --watch
```

#### 3. Visualizar a dashboard (UI)

```bash
kubectl argo rollouts dashboard
# Acesse http://localhost:3100
```

#### 4. Após deploy, promover manualmente a nova versão

```bash
kubectl argo rollouts promote ivodocker-dev -n default
```

#### 5. Abortar um rollout em andamento

```bash
kubectl argo rollouts abort ivodocker-dev -n default
```

#### 6. Fazer rollback para a versão anterior

```bash
kubectl argo rollouts undo ivodocker-dev -n default
```

#### 7. Ver histórico de revisões

```bash
kubectl argo rollouts history ivodocker-dev -n default
```

### Fluxo de Trabalho BlueGreen (DEV)

1. **Deploy da nova versão**: Faça push do código ou atualize a imagem
2. **Preview criado**: Nova versão fica disponível no service preview
3. **Teste o preview**:
   ```bash
   kubectl port-forward service/ivodocker-dev-preview 3001:3000 -n default
   # Acesse http://localhost:3001
   ```
4. **Aprovar manualmente** se tudo estiver OK:
   ```bash
   kubectl argo rollouts promote ivodocker-dev -n default
   ```
5. **Rollout completado**: Nova versão vira a ativa, versão antiga é removida após 30s

---

## Ambiente PROD - Estratégia Canary

### Características

- **Progressão de tráfego**: 20% → 40% → 60% → 80% → 100%
- **Pausas automáticas**: Em cada etapa (após 20%, requer ação manual)
- **MaxSurge**: 25% (permite pods extras durante rollout)

### Comandos Importantes

#### 1. Ver status do rollout

```bash
kubectl argo rollouts get rollout ivodocker-prod -n default
# ou sem plugin:
kubectl get rollout ivodocker-prod -n default
```

#### 2. Acompanhar o rollout em tempo real

```bash
kubectl argo rollouts get rollout ivodocker-prod -n default --watch
```

#### 3. Promover para próximo step

```bash
kubectl argo rollouts promote ivodocker-prod -n default
```

#### 4. Ajustar tráfego manualmente (para demonstração)

```bash
# Definir peso específico (ex: 50%)
kubectl argo rollouts set image ivodocker-prod ivodocker-chart=ghcr.io/paulohenriquejunio/ivodocker:nova-tag -n default
kubectl argo rollouts set weight ivodocker-prod 50 -n default

# Verificar o peso atual
kubectl argo rollouts get rollout ivodocker-prod -n default
```

#### 5. Abortar um rollout

```bash
kubectl argo rollouts abort ivodocker-prod -n default
```

#### 6. Fazer rollback

```bash
kubectl argo rollouts undo ivodocker-prod -n default
```

#### 7. Pular todas as pausas (auto-promover tudo)

```bash
kubectl argo rollouts promote ivodocker-prod -n default --full
```

### Fluxo de Trabalho Canary (PROD)

1. **Deploy da nova versão**: Faça push do código ou atualize a imagem
2. **20% do tráfego** vai para nova versão (pausa automática)
3. **Verificar métricas** da nova versão
4. **Promover** se OK:
   ```bash
   kubectl argo rollouts promote ivodocker-prod -n default
   ```
5. **40% do tráfego** (aguarda 10s automaticamente)
6. **Promover novamente** → 60% (aguarda 10s)
7. **Promover novamente** → 80% (aguarda 10s)
8. **Promover final** → 100% (rollout completo)

---

## Comandos Gerais

### Ver todos os rollouts

```bash
kubectl get rollouts --all-namespaces
```

### Ver eventos de um rollout

```bash
kubectl describe rollout ivodocker-dev -n default
kubectl describe rollout ivodocker-prod -n default
```

### Ver logs dos pods

```bash
# DEV
kubectl logs -l app.kubernetes.io/name=ivodocker-chart -n default -f

# PROD
kubectl logs -l app.kubernetes.io/name=ivodocker-chart -n default -f
```

### Restart de um rollout (força novo deploy)

```bash
kubectl argo rollouts restart ivodocker-dev -n default
kubectl argo rollouts restart ivodocker-prod -n default
```

---

## Dashboard Web (Recomendado para Apresentação)

A dashboard visual é excelente para demonstrações:

```bash
kubectl argo rollouts dashboard
```

Acesse: http://localhost:3100

Features da dashboard:

- Visualização gráfica do rollout
- Controle de promoção/abort com botões
- Histórico de revisões
- Status em tempo real
- Logs integrados

---

## Troubleshooting

### Rollout travado

```bash
# Ver detalhes
kubectl describe rollout <nome> -n default

# Forçar abort e refazer
kubectl argo rollouts abort <nome> -n default
kubectl argo rollouts restart <nome> -n default
```

### Verificar versões dos ReplicaSets

```bash
kubectl get replicasets -n default -l app.kubernetes.io/name=ivodocker-chart
```

### Ver análise de rollout

```bash
kubectl get analysisrun -n default
```

---

## Exemplos para Apresentação

### Demo BlueGreen (DEV)

1. Abrir dashboard: `kubectl argo rollouts dashboard`
2. Fazer uma mudança na aplicação e commitar
3. Aguardar CI/CD fazer deploy
4. Na dashboard, mostrar preview vs active
5. Promover manualmente
6. Mostrar swap das versões

### Demo Canary (PROD)

1. Abrir dashboard em uma tela
2. Fazer deploy de nova versão
3. Mostrar tráfego começando em 20%
4. Demonstrar promoção manual passo a passo
5. Mostrar como ajustar peso manualmente:
   ```bash
   kubectl argo rollouts set weight ivodocker-prod 30 -n default
   ```
6. Completar o rollout

---

## Configurações Atuais

### DEV (BlueGreen)

```yaml
rollout:
  enabled: true
  strategy: "blueGreen"
  blueGreen:
    autoPromotionEnabled: false # Promoção manual
    scaleDownDelaySeconds: 30 # Aguarda 30s antes de remover versão antiga
```

### PROD (Canary)

```yaml
rollout:
  enabled: true
  strategy: "canary"
  canary:
    steps:
      - setWeight: 20
      - pause: {} # Pausa manual
      - setWeight: 40
      - pause: { duration: 10 } # Pausa 10s
      - setWeight: 60
      - pause: { duration: 10 }
      - setWeight: 80
      - pause: { duration: 10 }
    maxSurge: "25%"
    maxUnavailable: 0
```

---

## Recursos Adicionais

- [Documentação Oficial Argo Rollouts](https://argoproj.github.io/argo-rollouts/)
- [BlueGreen Strategy](https://argoproj.github.io/argo-rollouts/features/bluegreen/)
- [Canary Strategy](https://argoproj.github.io/argo-rollouts/features/canary/)
- [kubectl Plugin](https://argoproj.github.io/argo-rollouts/installation/#kubectl-plugin-installation)
