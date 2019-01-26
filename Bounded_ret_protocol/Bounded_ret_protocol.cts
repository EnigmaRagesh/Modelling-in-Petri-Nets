// TPN name=/home/ragesh/romeo-3.4.3/petrinets/Bounded_ret_protocol/Bounded_ret_protocol.cts











initially { // insert here the state variables declarations 
// and possibly some code to initialize them 
// using C-like syntax

int i = 0;
int b1 = 0;
int x = 0;
int bN = 0;
int rc = 0;
int n = 3;
int ab = 0;

int N = 3;
int N_1 = 2;
int T1 = 1;
int TR = 2;
int SYNC = 3;
int MAX = 2;
int MAX_1 = 1;

int w = 0;
int exp_ab = 0;
int z = 0;
int v = 0;
int u = 0;
int rab = 0;
int rbN = 0;
int rb1 = 0;



 

int idle=1, next_frame=0, ntest=0, wait_ack=0, success=0, error=0, start_K=1, in_transit_K=0, new_file=1, first_safe_frame=0, frame_received=0, idle_1=0, report=0, start_L=1, in_transit_L=0, error_R=0; }

transition [ intermediate {   idle =  idle  - 1; }]  Tr [0,0]
      when (idle >= 1)
      { i=1;
b1=1;
  idle = idle  - 1 , next_frame = next_frame + 1; }

transition [ intermediate {   next_frame =  next_frame  - 1; }]  T2 [0,0]
      when ((i ==N) and next_frame >= 1)
      { bN = 1;  next_frame = next_frame  - 1 , ntest = ntest + 1; }

transition [ intermediate {   next_frame =  next_frame  - 1; }]  T3 [0,0]
      when ((i<=N_1) and next_frame >= 1)
      { bN = 0;  next_frame = next_frame  - 1 , ntest = ntest + 1; }

transition [ intermediate {   ntest =  ntest  - 1 , start_K =  start_K  - 1; }]  T4 [0,inf]
      when ((x == 0) and ntest >= 1 and start_K >= 1)
      { rc =1;  ntest = ntest  - 1 , start_K = start_K  - 1 , wait_ack = wait_ack + 1 , in_transit_K = in_transit_K + 1; }

transition [ intermediate {   wait_ack =  wait_ack  - 1 , start_K =  start_K  - 1; }]  T5 [0,inf]
      when ((x == T1 and rc <= MAX_1) and wait_ack >= 1 and start_K >= 1)
      { x = 0;
rc = rc +1;
  wait_ack =  wait_ack  - 1 +  1 , start_K = start_K  - 1 , in_transit_K = in_transit_K + 1; }

transition [ intermediate {   success =  success  - 1; }]  T6 [0,inf]
      when (success >= 1)
      {   success = success  - 1 , next_frame = next_frame + 1; }

transition [ intermediate {   wait_ack =  wait_ack  - 1; }]  T7 [0,inf]
      when ((x == T1 and rc == MAX and i == N) and wait_ack >= 1)
      { x = 0;
  wait_ack = wait_ack  - 1 , error = error + 1; }

transition [ intermediate {   wait_ack =  wait_ack  - 1; }]  T8 [0,inf]
      when (wait_ack >= 1)
      {   wait_ack = wait_ack  - 1 , error = error + 1; }

transition [ intermediate {   success =  success  - 1; }]  T9 [0,0]
      when ((i == N) and success >= 1)
      {   success = success  - 1 , idle = idle + 1; }

transition [ intermediate {   error =  error  - 1; }]  T10 [0,inf]
      when ((x == SYNC) and error >= 1)
      { ab = 0;  error = error  - 1 , idle = idle + 1; }

transition [ intermediate {   wait_ack =  wait_ack  - 1; }]  T11 [0,inf]
      when ((x<=T1) and wait_ack >= 1)
      { x = 0;
ab = -1*ab+1;
  wait_ack = wait_ack  - 1 , success = success + 1; }

transition [ intermediate {   idle_1 =  idle_1  - 1; }]  T12 [0,inf]
      when ((z == TR and rbN == 1) and idle_1 >= 1)
      {   idle_1 = idle_1  - 1 , new_file = new_file + 1; }

transition [ intermediate {   error_R =  error_R  - 1; }]  T13 [0,inf]
      when ((z == SYNC) and error_R >= 1)
      {   error_R = error_R  - 1 , new_file = new_file + 1; }

transition [ intermediate {   first_safe_frame =  first_safe_frame  - 1; }]  T14 [0,inf]
      when ((w == 0 and rab == 0) and first_safe_frame >= 1)
      { exp_ab = 0;
  first_safe_frame = first_safe_frame  - 1 , frame_received = frame_received + 1; }

transition [ intermediate {   first_safe_frame =  first_safe_frame  - 1; }]  T15 [0,inf]
      when ((w == 0 and rab == 1) and first_safe_frame >= 1)
      { exp_ab = 1;  first_safe_frame = first_safe_frame  - 1 , frame_received = frame_received + 1; }

transition [ intermediate {   new_file =  new_file  - 1 , in_transit_K =  in_transit_K  - 1; }]  T16 [0,inf]
      when ((u == 0 and b1 == 0 and rb1 == 0 ) and new_file >= 1 and in_transit_K >= 1)
      { z = 0;
w = 0;
rb1 = 0;  new_file = new_file  - 1 , in_transit_K = in_transit_K  - 1 , first_safe_frame = first_safe_frame + 1 , start_K = start_K + 1; }

transition [ intermediate {   idle_1 =  idle_1  - 1 , in_transit_K =  in_transit_K  - 1 , start_K =  start_K  - 1; }]  T17 [0,inf]
      when ((z <= TR and u == 0 and b1 == 0 and rb1 == 0 ) and idle_1 >= 1 and in_transit_K >= 1 and start_K >= 1)
      { w = 0;  idle_1 = idle_1  - 1 , in_transit_K = in_transit_K  - 1 , start_K = start_K  - 1 , frame_received = frame_received + 1; }

transition [ intermediate {   frame_received =  frame_received  - 1; }]  T18 [0,inf]
      when ((w == 0 and rab == 1 and exp_ab == 1) and frame_received >= 1)
      { exp_ab = -1*exp_ab +1;  frame_received = frame_received  - 1 , report = report + 1; }

transition [ intermediate {   frame_received =  frame_received  - 1; }]  T19 [0,inf]
      when ((w == 0 and rab == 0 and exp_ab == 0) and frame_received >= 1)
      { exp_ab = -1*exp_ab+1;
  frame_received = frame_received  - 1 , report = report + 1; }

transition [ intermediate {   report =  report  - 1; }]  T20 [0,inf]
      when ((w == 0 and rb1 == 0 and rbN == 0) and report >= 1)
      { z = 0;  report = report  - 1 , idle_1 = idle_1 + 1; }

transition [ intermediate {   report =  report  - 1; }]  T21 [0,inf]
      when ((w == 0 and rbN == 1) and report >= 1)
      { z = 0;
  report = report  - 1 , idle_1 = idle_1 + 1; }

transition [ intermediate {   report =  report  - 1; }]  T22 [0,inf]
      when ((w == 0 and rb1 == 0 and rbN == 0) and report >= 1)
      { z = 0;  report = report  - 1 , idle_1 = idle_1 + 1; }

transition [ intermediate {   in_transit_L =  in_transit_L  - 1; }]  T23 [0,inf]
      when ((v == 0) and in_transit_L >= 1)
      {   in_transit_L = in_transit_L  - 1 , start_L = start_L + 1; }

transition [ intermediate {   frame_received =  frame_received  - 1 , start_L =  start_L  - 1; }]  T24 [0,inf]
      when ((w == 0 and rab == 1 and exp_ab == 0) and frame_received >= 1 and start_L >= 1)
      { v = 0;  frame_received = frame_received  - 1 , start_L = start_L  - 1 , idle_1 = idle_1 + 1 , in_transit_L = in_transit_L + 1; }

transition [ intermediate {   frame_received =  frame_received  - 1 , start_L =  start_L  - 1; }]  T25 [0,inf]
      when ((w == 0 and rab == 1 and exp_ab == 0) and frame_received >= 1 and start_L >= 1)
      { v = 0;  frame_received = frame_received  - 1 , start_L = start_L  - 1 , idle_1 = idle_1 + 1 , in_transit_L = in_transit_L + 1; }

transition [ intermediate {   in_transit_K =  in_transit_K  - 1; }]  T26 [0,inf]
      when ((u == 0) and in_transit_K >= 1)
      {   in_transit_K = in_transit_K  - 1 , start_K = start_K + 1; }

transition [ intermediate {   idle_1 =  idle_1  - 1; }]  T29 [0,inf]
      when ((z == TR and rbN == 0) and idle_1 >= 1)
      { z =0;  idle_1 = idle_1  - 1 , error_R = error_R + 1; }

transition [ intermediate {   in_transit_L =  in_transit_L  - 1; }]  T30 [0,inf]
      when ((v == 0) and in_transit_L >= 1)
      {   in_transit_L = in_transit_L  - 1 , start_L = start_L + 1; }


  // insert TCTL formula here : check formula
