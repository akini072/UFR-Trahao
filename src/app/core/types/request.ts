/* ORÇADA: Botão Aprovar/Rejeitar Serviço, que apresenta a tela de Mostrar orçamento FED - RF005 - Tela de Mostrar orçamento #5
APROVADA: Sem botão de ação
REJEITADA: Botão Resgatar Serviço FED - RF009 - Modal Resgatar Serviço #9
ARRUMADA: Botão Pagar Serviço FED - RF010 - Tela Pagar Serviço #10
Outros estados: Botão Visualizar Serviço FED - RF008 - Tela Visualizar Serviço #8 */

/* + OPEN
+ BUDGETED
+ REJECTED
+ APPROVED
+ REDIRECTED
+ FIXED
+ PAID
+ FINALIZED */

export type RequestStatus = 'open' | "budgeted" | 'approved' | 'rejected' | "fixed" | 'paid' | "finalized" | "redirected" | undefined;

export interface Request {
    id: number;
    title: string;
    description: string;
    status: RequestStatus;
    created_at: string;
    image: string;
}