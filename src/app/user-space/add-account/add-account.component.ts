import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BankService} from "../../shared/services/bank.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  @Input() userId: string = null!;
  @Output() closeEvent : EventEmitter<void> = new EventEmitter<void>();

  accountForm : FormGroup = null!;
  currencyName: any;
  currencies : String[] = []
  currenciesNames : String[] = []
  subscription : Subscription = null!;
  currenciesSubject : BehaviorSubject<String[]> | null = null;
  currenciesNameSubject : BehaviorSubject<String[]> | null = null;

  constructor(private bankService : BankService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this.currenciesSubject = this.bankService.getCurrencies();
    this.subscription = this.currenciesSubject
      //@ts-ignore
      .subscribe((res) => {
        this.currencies = res;
      });

    this.currenciesNameSubject = this.bankService.getCurrenciesNames();
    this.subscription = this.currenciesNameSubject
      //@ts-ignore
      .subscribe((res) => {
        this.currenciesNames = res;
      });

    this.accountForm = this.fb.group({
      currency : new FormControl(this.currencies[0]),
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSubmit(){
    this.bankService.addAccount(this.accountForm.value);
    this.closeEvent.emit();
  }

}
