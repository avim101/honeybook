// Angular
import { TestBed } from '@angular/core/testing';

// APP
import { ContactListFacade } from './contact-list.facade';

describe('ContactSandboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContactListFacade = TestBed.get(ContactListFacade);
    expect(service).toBeTruthy();
  });
});
